import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class L1 extends BaseConfig {
  static displayName = 'L1';
  constructor({
    l1,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'l1',
      label: 'Parameter',
      value: l1,
      defaultValue: 0.01,
      min: 0,
      max: 1,
      step: 0.01,
    });
  }
  tf = () => tf.regularizers.l1({
    l1: this.getPropValue('l1'),
  });
}
