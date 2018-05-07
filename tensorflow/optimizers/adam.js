import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';

export default class Adam extends BaseConfig {
  static displayName = 'Adam';
  constructor({
    lr, beta1, beta2, epsilon,
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
      name: 'beta1',
      label: 'Beta 1',
      value: beta1,
      defaultValue: 0.89999998,
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericProperty({
      name: 'beta2',
      label: 'Beta 2',
      value: beta2,
      defaultValue: 0.99900001,
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericProperty({
      name: 'epsilon',
      label: 'Epsilon',
      value: epsilon,
      defaultValue: undefined,
      min: 0,
      max: 0.001,
      step: 0.0001,
    });
  }
   tf = () => tf.train.adam(this.getValue('lr'), this.getValue('beta1'), this.getValue('beta2'), this.getValue('epsilon'));
}
