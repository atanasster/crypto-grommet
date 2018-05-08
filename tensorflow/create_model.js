import * as tf from '@tensorflow/tfjs/dist/index';


export default (model) => {
  const tfModel = tf.sequential();
  model.layers.forEach((layer, index) => {
    const config = { units: layer.config.units };
    if (index === 0) {
      // first layer, inputshape
      config.inputShape = [model.features.length];
    } else if (index === model.layers.length - 1) {
      config.units = model.targets.length;
    }
    tfModel.add(tf.layers.dense(config));
  });
  return tfModel;
};
