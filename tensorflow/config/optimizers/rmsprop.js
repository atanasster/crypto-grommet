import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';

export default class RMSProp extends BaseConfig {
  static displayName = 'RMSprop';
  constructor({
    lr, decay, momentum, epsilon, centered,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'lr',
      label: 'Learning rate',
      value: lr,
      defaultValue: 0.001,
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericProperty({
      name: 'decay',
      label: 'Decay',
      value: decay,
      defaultValue: 0.9,
      min: 0,
      max: 0.1,
      step: 0.01,
    });
    this.addNumericProperty({
      name: 'momentum',
      label: 'Momentum',
      value: momentum,
      defaultValue: 0.0,
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericProperty({
      name: 'epsilon',
      label: 'Epsilon',
      value: epsilon,
      defaultValue: 1e-8,
      min: 0,
      max: 0.001,
      step: 0.0001,
    });
    this.addBooleanProperty({
      name: 'centered',
      label: 'Centered',
      value: centered,
    });
  }
  tf = () => tf.train.sgd(this.getPropValue('lr'), this.getPropValue('decay'), this.getPropValue('momentum'),
    this.getPropValue('epsilon'), this.getPropValue('centered'));
}
