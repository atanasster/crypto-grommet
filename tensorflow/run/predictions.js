import * as tf from '@tensorflow/tfjs';
import createTFModel from './create_model';
import { loadDatasets, normalizeData, scaleData } from './data_preparation';


export default async (model) => {
  const data = await loadDatasets(model.features, model.dataPoints, model.lookbackDays);
  const { normalized } = normalizeData(data);
  const scaledData = scaleData(normalized, model.scalers.slice(0, model.features.length));
  const numData = scaledData.length;
  // remove date from first column
  const pureData = scaledData.map(row => row.slice(1));
  if (pureData.length > 0) {
    const xDims = pureData[0].length;
    // Create 2D `tf.Tensor` to hold the features data.
    const xData = tf.tensor2d(pureData, [numData, xDims]);
    const tfModel = createTFModel(model, xData.shape.slice(1));
    const p = tfModel.predict(xData);
    p.print();
  }
  return 'hello';//
};
