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
      defaultValue: 0.001,
      min: 0,
      max: 1,
      step: 0.001,
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
    this.addBooleanProperty({
      name: 'nesterov',
      label: 'Nesterov momentum',
      value: nesterov,
      defaultValue: false,
    });
  }
  tf = () => tf.train.momentum(this.getPropValue('lr'), this.getPropValue('momentum'), this.getPropValue('nesterov'))
}
