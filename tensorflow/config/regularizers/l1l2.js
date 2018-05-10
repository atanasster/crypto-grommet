import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class L1L2 extends BaseConfig {
  static displayName = 'L1L2';
  constructor({
    l1, l2,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'l1',
      label: 'L1',
      value: l1,
      defaultValue: 0.01,
      min: 0,
      max: 1,
      step: 0.01,
    });
    this.addNumericProperty({
      name: 'l2',
      label: 'L2',
      value: l2,
      defaultValue: 0.01,
      min: 0,
      max: 1,
      step: 0.01,
    });
  }
  tf = () => tf.regularizers.l1l2({
    l1: this.getPropValue('l1'),
    l2: this.getPropValue('l2'),
  });
}
