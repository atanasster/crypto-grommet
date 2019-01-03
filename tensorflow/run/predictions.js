import * as tf from '@tensorflow/tfjs';
import createTFModel from './create_model';
import { loadDatasets, normalizeData, scaleData } from './data_preparation';


export default async (savedModel) => {
  const data = await loadDatasets(
    savedModel.model.features,
    savedModel.model.dataPoints,
    savedModel.model.lookbackDays
  );
  const { normalized } = normalizeData(data);
  if (normalized.length <= 0) {
    return {};
  }
  const scaledData = scaleData(
    normalized,
    savedModel.scalers.slice(0, savedModel.model.features.length)
  );
  const numData = scaledData.length;
  // remove date from first column
  const pureData = scaledData.map(row => row.slice(1));
  if (pureData.length > 0) {
    const xDims = pureData[0].length;
    // Create 2D `tf.Tensor` to hold the features data.
    const xData = tf.tensor2d(pureData, [numData, xDims]);
    let xDataR;
    if (savedModel.model.layers.length > 0 &&
      ['LSTM', 'GRU', 'SimpleRNN'].indexOf(savedModel.model.layers[0].config.type) !== -1) {
      xDataR = xData.reshape([xData.shape[0], xData.shape[1], 1]);
    } else {
      xDataR = xData;
    }
    const tfModel = createTFModel(savedModel.model, savedModel.inputShape);
    const p = tfModel.predict(xDataR);
    const scaler = savedModel.scalers[savedModel.scalers.length - 1];
    const scaledPredict = p.dataSync().map(v => v / scaler);
    const numPoints = savedModel.model.lookbackDays;
    const lastDate = normalized[normalized.length - 1][0];
    return {
      predictions: scaledPredict.slice(
        Math.max(scaledPredict.length - numPoints, 1)
      ),
      lastDate,
    };
  }
  return {};
};
