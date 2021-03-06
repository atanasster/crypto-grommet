import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';

export default class AdaMax extends BaseConfig {
  static displayName = 'Adamax';
  constructor({
    lr, beta1, beta2, epsilon, decay,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'lr',
      label: 'Learning rate',
      value: lr,
      defaultValue: 0.002,
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericProperty({
      name: 'beta1',
      label: 'Beta 1',
      value: beta1,
      defaultValue: 0.9,
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericProperty({
      name: 'beta2',
      label: 'Beta 2',
      value: beta2,
      defaultValue: 0.999,
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
    this.addNumericProperty({
      name: 'decay',
      label: 'Decay',
      value: decay,
      defaultValue: 0.0,
      min: 0,
      max: 0.1,
      step: 0.01,
    });
  }
   tf = () => tf.train.adamax(this.getPropValue('lr'), this.getPropValue('beta1'), this.getPropValue('beta2'),
     this.getPropValue('epsilon'), this.getPropValue('decay'));
}
