import * as tf from '@tensorflow/tfjs';
import initApollo from '../../apollo/initApollo';
import { priceHistoryQuery as coinPrices } from '../../graphql/coins';
import { priceHistoryQuery as equityPrices } from '../../graphql/equities';

const apolloClient = initApollo();

export async function queryPriceData(symbol, query, limit) {
  const { data: { prices: { list: { results } } } } = await apolloClient.query({
    query,
    variables: { symbol, limit },
  });
  return results;
}

export async function loadPriceData(symbol, type, limit) {
  let result = null;
  switch (type) {
    case 'coin':
      result = await queryPriceData(symbol, coinPrices, limit);
      break;
    case 'equity':
    default:
      result = await queryPriceData(symbol, equityPrices, limit);
      break;
  }
  return result;
}

function convertToTensors(features, targets, testSplit) {
  const numFeatures = features.length;
  if (numFeatures !== targets.length) {
    throw new Error('features and targets have different numbers of examples');
  }

  const numTestExamples = Math.round(numFeatures * testSplit);
  const numTrainExamples = numFeatures - numTestExamples;

  const xDims = features[0].length;
  const yDims = targets[0].length;
  // console.log(features);
  // Create 2D `tf.Tensor` to hold the features data.
  const xs = tf.tensor2d(features, [numFeatures, xDims]);
  // Create 2D `tf.Tensor` to hold the targets data.
  const ys = tf.tensor2d(targets, [numFeatures, yDims]);

  // Split the data into training and test sets, using tf slice
  const xTrain = xs.slice([0, 0], [numTrainExamples, xDims]);
  const xTest = xs.slice([numTrainExamples, 0], [numTestExamples, xDims]);
  const yTrain = ys.slice([0, 0], [numTrainExamples, yDims]);
  const yTest = ys.slice([numTrainExamples, 0], [numTestExamples, yDims]);
  return {
    xTrain, yTrain, xTest, yTest,
  };
}

const dataKey = item => (`${item.type}_${item.symbol}`);

const dateToSort = (date) => {
  if (date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month <= 9 ? `0${month}` : month;
    day = day <= 9 ? `0${day}` : day;
    return `${date.getFullYear()}/${month}/${day}`;
  }
  return null;
};

function mergeData(fields, loadedData) {
  const data = {};
  fields.forEach((item, index) => {
    const prices = loadedData[dataKey(item)];
    if (prices && prices.prices) {
      prices.prices.forEach((price) => {
        const date = dateToSort(new Date(price.date));
        if (data[date] === undefined) {
          data[date] = [];
        }
        data[date][index] = price[item.field];
      });
    }
  });
  // first row is the date
  // next are the features, one by row and finally the target
  // sort in ascending order by date
  // fill gaps in data
  return Object.keys(data)
    .map(key => [key, ...data[key]])
    .sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });
}
export function scaleData(data, scalers) {
  if (scalers === undefined) {
    return data;
  }
  return data.map((row) => {
    const newRow = [row[0]];
    scalers.forEach((scaler, c) => {
      newRow.push(row[c + 1] * scaler);
    });
    return newRow;
  });
}
export function normalizeData(data) {
  const normalized = [];
  if (data.length > 0) {
    const numData = data[0].length - 1;
    const scalers = Array(...Array(numData)).map(Number.prototype.valueOf, 1);
    const maxValues = Array(...Array(numData)).map(Number.prototype.valueOf, 0);

    // fill NA values or discard rows
    data.forEach((row, r) => {
      const newRow = [row[0]];
      let skip = false;
      for (let c = 1; c <= numData; c += 1) {
        let val = row[c];
        if (val === undefined) {
          if (data[r - 1] !== undefined && data[r - 1][c] !== undefined) {
            val = data[r - 1][c];
          } else {
            skip = true;
            break;
          }
        }
        const absVal = Math.abs(val);
        if (absVal > maxValues[c - 1]) {
          maxValues[c - 1] = absVal;
        }
        newRow[c] = val;
      }
      if (!skip) {
        normalized.push(newRow);
      }
    });
    maxValues.forEach((maxValue, c) => {
      scalers[c] = 1 / maxValue;
    });
    return { normalized, scalers };
  }
  return { normalized: data };
}

function shiftTargets(data, numFeatures, numTargets, lookbackDays) {
  const xData = [];
  const yData = [];
  for (let r = lookbackDays; r < data.length; r += 1) {
    const row = data[r];
    const rowLookback = data[r - lookbackDays];
    xData.push(rowLookback.slice(1, numFeatures + 1));
    yData.push(row.slice(1 + numFeatures));
  }
  return { xData, yData };
}

export const loadDatasets = async (fields, dataPoints, lookbackDays) => {
  const uniqueDatasets = fields.reduce((r, item) => (
    { ...r, [dataKey(item)]: { ...item } }
  ), {});
  await Promise.all(Object.keys(uniqueDatasets).map(async (key) => {
    const item = uniqueDatasets[key];
    item.prices = await loadPriceData(item.symbol, item.type, dataPoints + lookbackDays);
  }));
  return mergeData(fields, uniqueDatasets);
};

export async function prepareTestTrainData({
  features, targets, testSplit, lookbackDays, dataPoints,
}, onProgress) {
  if (onProgress) {
    onProgress('loading datasets');
  }
  const data = await loadDatasets(features.concat(targets), dataPoints, lookbackDays);
  if (onProgress) {
    onProgress('normalize data');
  }
  const { normalized, scalers } = normalizeData(data);
  if (onProgress) {
    onProgress('convert to tensors');
  }
  const scaledData = scaleData(normalized, scalers);
  const { xData, yData } =
    shiftTargets(scaledData, features.length, targets.length, lookbackDays);
  const {
    xTrain, yTrain, xTest, yTest,
  } = convertToTensors(xData, yData, testSplit);
  const lastValue = normalized[normalized.length - 1][features.length + 1];
  return {
    xTrain, yTrain, xTest, yTest, scalers, lastValue,
  };
}
