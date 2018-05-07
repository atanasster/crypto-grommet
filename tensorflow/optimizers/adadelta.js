import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';

export default class AdaDelta extends BaseConfig {
  static displayName = 'Adadelta';
  constructor({
    lr, rho, epsilon,
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
      name: 'rho',
      label: 'Rho',
      value: 0.95,
      defaultValue: rho,
      min: 0.9,
      max: 0.999,
      step: 0.001,
    });
    this.addNumericProperty({
      name: 'epsilon',
      label: 'Epsilon',
      value: 1e-08,
      defaultValue: epsilon,
      min: 0,
      max: 0.001,
      step: 0.0001,
    });
  }
   tf = () => tf.train.adadelta(this.getPropValue('lr'), this.getPropValue('rho'), this.getPropValue('epsilon'));
}
