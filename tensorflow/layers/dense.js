import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';

export default class Dense extends BaseConfig {
  static displayName = 'Dense';
  constructor({
    units, name,
  } = {}) {
    super();
    this.addTextProperty({
      name: 'name',
      label: 'Name',
      help: 'name of the layer',
      value: name,
      defaultValue: '',
    });
    this.addNumberProperty({
      name: 'units',
      label: 'Units',
      help: 'output units of the layer',
      min: 1,
      max: 50,
      step: 1,
      value: units,
      defaultValue: 1,
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
    /* activation?: ActivationIdentifier;
    useBias?: boolean;
    kernelInitializer?: InitializerIdentifier | Initializer;
    biasInitializer?: InitializerIdentifier | Initializer;
    inputDim?: number;
    kernelConstraint?: ConstraintIdentifier | Constraint;
    biasConstraint?: ConstraintIdentifier | Constraint;
    kernelRegularizer?: RegularizerIdentifier | Regularizer;
    biasRegularizer?: RegularizerIdentifier | Regularizer;
    activityRegularizer?: RegularizerIdentifier | Regularizer; */
  }
   tf = () => tf.train.adam(this.getPropValue('lr'), this.getPropValue('beta1'), this.getPropValue('beta2'), this.getPropValue('epsilon'));
}
