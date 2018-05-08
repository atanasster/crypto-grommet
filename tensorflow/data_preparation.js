import * as tf from '@tensorflow/tfjs';
import initApollo from '../apollo/initApollo';
import { priceHistoryQuery as coinPrices } from '../graphql/coins';
import { priceHistoryQuery as equityPrices } from '../graphql/equities';


export async function queryPriceData(symbol, query) {
  const client = initApollo();
  const { data: { prices: { list: { results } } } } = await client.query({
    query,
    variables: { symbol, limit: 1000 },
  });
  return results;
}

export async function loadPriceData(symbol, type) {
  let result = null;
  switch (type) {
    case 'coin':
      result = await queryPriceData(symbol, coinPrices);
      break;
    case 'equity':
    default:
      result = await queryPriceData(symbol, equityPrices);
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

  // Create 2D `tf.Tensor` to hold the features data.
  const xs = tf.tensor2d(features, [numFeatures, xDims]);

  // Create 2D `tf.Tensor` to hold the targets data.
  const ys = tf.tensor2d(targets, [numFeatures, yDims]);

  // Split the data into training and test sets, using tf slice
  const xTrain = xs.slice([0, 0], [numTrainExamples, xDims]);
  const xTest = xs.slice([numTrainExamples, 0], [numTestExamples, xDims]);
  const yTrain = ys.slice([0, 0], [numTrainExamples, yDims]);
  const yTest = ys.slice([numTrainExamples, 0], [numTestExamples, yDims]);
  return [xTrain, yTrain, xTest, yTest];
}

export async function loadData(features, targets) {
  let uniqueSymbols = features.reduce((r, item) => (
    { ...r, [`${item.type}_${item.symbol}`]: item }
  ), {});
  uniqueSymbols = targets.reduce((r, item) => (
    { ...r, [`${item.type}_${item.symbol}`]: item }
  ), uniqueSymbols);

  const prices = await Promise.all(Object.keys(uniqueSymbols).map(async (key) => {
    const item = uniqueSymbols[key];
    return { ...uniqueSymbols[key], prices: await loadPriceData(item.symbol, item.type) };
  }));
  const f = [[-1, 0, 1], [-3, 1, 2], [5, 4, 2], [6, 2, 1]];
  const t = [[-3], [-1], [1], [3]];
  console.log(prices);
  const [xTrain, yTrain, xTest, yTest] = convertToTensors(f, t, 0.33);
  return [xTrain, yTrain, xTest, yTest];
}
