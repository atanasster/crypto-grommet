import * as tf from '@tensorflow/tfjs';
import BaseUnitsLayer from './base__units_layer';
import activations from './activations';

export default class Dense extends BaseUnitsLayer {
  static displayName = 'Dense';
  constructor({
    activation, activityRegularizer,
    kernelInitializer, kernelConstraint, useBias, biasInitializer, biasRegularizer,
    biasConstraint, defaultActivation = 'linear', defaultBackground = '#07c66c', ...rest
  } = {}) {
    super({ ...rest, defaultBackground });
    this.addSelectProperty({
      name: 'activation',
      label: 'Activation',
      value: activation,
      options: activations,
      defaultValue: defaultActivation,
    });
    this.addComposedProperty({
      name: 'activityRegularizer',
      options: 'regularizer',
      label: 'Activity regularizer',
      value: activityRegularizer,
    });
    this.addComposedProperty({
      name: 'kernelInitializer',
      options: 'initializer',
      label: 'Kernel initializer',
      value: kernelInitializer,
    });
    this.addComposedProperty({
      name: 'kernelConstraint',
      options: 'constraint',
      label: 'Kernel constraint',
      value: kernelConstraint,
    });
    this.addBooleanProperty({
      name: 'useBias',
      label: 'Use bias',
      value: useBias,
    });
    this.addComposedProperty({
      name: 'biasInitializer',
      options: 'initializer',
      label: 'Bias initializer',
      value: biasInitializer,
    });
    this.addComposedProperty({
      name: 'biasRegularizer',
      options: 'regularizer',
      label: 'Bias regularizer',
      value: biasRegularizer,
    });
    this.addComposedProperty({
      name: 'biasConstraint',
      options: 'constraint',
      label: 'Bias constraint',
      value: biasConstraint,
    });
  }
   tf = (config) => {
     const c = {
       ...{
         units: this.getPropValue('units'),
         activation: this.getPropValue('activation'),
         useBias: this.getPropValue('useBias'),
         kernelInitializer: this.tfPropValue('kernelInitializer'),
         biasInitializer: this.tfPropValue('biasInitializer'),
         kernelConstraint: this.tfPropValue('kernelConstraint'),
         biasConstraint: this.tfPropValue('biasConstraint'),
         kernelRegularizer: this.tfPropValue('kernelRegularizer'),
         biasRegularizer: this.tfPropValue('biasRegularizer'),
         activityRegularizer: this.tfPropValue('activityRegularizer'),
       },
       ...config,
     };
     // console.log(c, tf.layers.dense(c), tf.layers.dense(config));
     return tf.layers.dense(c);
   }
}
