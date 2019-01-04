import * as tf from '@tensorflow/tfjs/dist/index';
import tensorflow from '../config';


export default (model) => {
  const tfModel = tf.sequential();
  let tfLayer;
  model.layers.forEach((l, index) => {
    const layer = tensorflow.createObject(l);
    const config = { units: l.config.units };
    if (index === model.layers.length - 1) {
      config.units = model.targets.length;
    }
    if (tfLayer === undefined) {
      config.inputShape = [model.features.length, 1];
    } else {
      // config.inputDims = tfLayer.units;
      // config.inputShape = tfLayer.output.shape;
      // console.log(config.inputShape);
    }
    if (l.weights && l.weights.length) {
      const weights = [];
      l.weights.forEach((weight) => {
        weights.push(tf.tensor(new Float32Array(weight.data), weight.shape));
      });
      config.weights = weights;
    }
    tfLayer = layer.tf(config);
    tfModel.add(tfLayer);
  });
  return tfModel;
};
