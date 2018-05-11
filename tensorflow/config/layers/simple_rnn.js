import * as tf from '@tensorflow/tfjs';
import Dense from './dense';

export default class SimpleRNN extends Dense {
  static displayName = 'SimpleRNN';
  constructor({
    recurrentInitializer, recurrentRegularizer, recurrentConstraint, dropout,
    recurrentDropout, unroll, stateful, goBackwards, ...rest
  } = {}) {
    super({ ...rest, defaultBackground: '#1398c6', defaultActivation: 'sigmoid' });
    this.addComposedProperty({
      name: 'recurrentInitializer',
      options: 'initializer',
      label: 'Recurrent initializer',
      value: recurrentInitializer,
    });
    this.addComposedProperty({
      name: 'recurrentRegularizer',
      options: 'regularizer',
      label: 'Recurrent regularizer',
      value: recurrentRegularizer,
    });
    this.addComposedProperty({
      name: 'recurrentConstraint',
      options: 'constraint',
      label: 'Recurrent constraint',
      value: recurrentConstraint,
    });
    this.addNumericProperty({
      name: 'dropout',
      label: 'Dropout',
      help: 'drop ratio of the linear transformation of the inputs',
      min: 0,
      max: 1,
      step: 0.1,
      value: dropout,
    });
    this.addNumericProperty({
      name: 'recurrentDropout',
      label: 'Recurrent dropout',
      help: 'drop ratio of the linear transformation of the recurrent state',
      min: 0,
      max: 1,
      step: 0.1,
      value: recurrentDropout,
    });
    this.addBooleanProperty({
      name: 'unroll',
      label: 'Unroll',
      help: 'unrolling can speed-up the model',
      value: unroll,
    });
    this.addBooleanProperty({
      name: 'stateful',
      label: 'Stateful',
      help: 'use state of each sample for next batch',
      value: stateful,
    });
    this.addBooleanProperty({
      name: 'goBackwards',
      label: 'Backwards',
      help: 'process the input sequence backward',
      value: goBackwards,
    });
  }

  tfConfig = config => ({
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
      recurrentInitializer: this.tfPropValue('recurrentInitializer'),
      recurrentRegularizer: this.tfPropValue('recurrentRegularizer'),
      recurrentConstraint: this.tfPropValue('recurrentConstraint'),
      dropout: this.getPropValue('dropout'),
      recurrentDropout: this.getPropValue('recurrentDropout'),
      goBackwards: this.getPropValue('goBackwards'),
      stateful: this.getPropValue('stateful'),
      unroll: this.getPropValue('unroll'),
    },
    ...config,
  }
  );
  tf = config => tf.layers.simpleRNN(this.tfConfig(config));
}
