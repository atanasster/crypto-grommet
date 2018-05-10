import * as tf from '@tensorflow/tfjs/dist/index';
import tensorflow from '../config';


export default (model, shape) => {
  const tfModel = tf.sequential();
  let tfLayer;
  model.layers.forEach((l, index) => {
    const layer = tensorflow.createObject(l);
    const config = { units: l.config.units };
    if (index === model.layers.length - 1) {
      config.units = model.targets.length;
    }
    if (tfLayer === undefined) {
      config.inputShape = shape;
    } else {
      // config.inputDims = tfLayer.units;
      // config.inputShape = tfLayer.output.shape;
      // console.log(config.inputShape);
    }
    tfLayer = layer.tf(config);
    tfModel.add(tfLayer);
  });
  return tfModel;
};
