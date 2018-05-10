import * as tf from '@tensorflow/tfjs/dist/index';
import tensorflow from '../config';


export default (model) => {
  const tfModel = tf.sequential();
  model.layers.forEach((l, index) => {
    const layer = tensorflow.createObject(l);
    const config = { units: l.config.units };
    if (index === 0) {
      // first layer, inputshape
      config.inputShape = [model.features.length];
    } else if (index === model.layers.length - 1) {
      config.units = model.targets.length;
    }
    tfModel.add(layer.tf(config));
  });
  return tfModel;
};
