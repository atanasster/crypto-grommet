import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';

export default class Momentum extends BaseConfig {
  static displayName = 'Momentum';
  constructor({ lr, momentum, nesterov } = {}) {
    super();
    this.addNumericProperty({
      name: 'lr',
      label: 'Learning rate',
      value: lr,
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericProperty({
      name: 'momentum',
      label: 'Momentum',
      value: momentum,
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addBooleanProperty({
      name: 'nesterov',
      label: 'Nesterov momentum',
      value: nesterov,
    });
  }
  tf = () => tf.train.momentum(this.getValue('lr'), this.getValue('momentum'), this.getValue('nesterov'))
}
