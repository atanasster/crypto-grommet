/**
 * Created by atanasster on 6/5/17.
 */
import BaseKerasLayer from './BaseKerasLayer';

export default class DenseLayer extends BaseKerasLayer {
  constructor(props) {
    super(props);
    this.addNumberProperty({
      name: 'units',
      label: 'Units',
      help: 'output units of the layer',
      min: 1,
      max: 50,
      step: 1,
    });
    this.addActivationProperty('activation', 'Activation', 'activation function');

    this.addRegularizerProperty('activity_regularizer', 'Activity regularizer', 'applied to the output of the layer');
    this.addInitializerProperty('kernel_initializer', 'Kernel initializer', 'linear transformation of the inputs');
    this.addConstraintProperty('kernel_constraint', 'Kernel constraint', 'applied to the kernel weights matrix');

    this.addBooleanProperty({
      name: 'use_bias',
      label: 'Use bias',
      help: 'use a bias vector',
    });
    this.addInitializerProperty('bias_initializer', 'Bias initializer', 'initializer for the bias vector');
    this.addRegularizerProperty('bias_regularizer', 'Bias regularizer', 'applied to the bias vector');
    this.addConstraintProperty('bias_constraint', 'Bias constraint', 'applied to the bias vector');
  }
}
