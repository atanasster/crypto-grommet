import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class L2 extends BaseConfig {
  static displayName = 'L2';
  constructor({
    l2,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'l2',
      label: 'Parameter',
      value: l2,
      defaultValue: 0.01,
      min: 0,
      max: 1,
      step: 0.01,
    });
  }
  tf = () => tf.regularizers.l2({
    l2: this.getPropValue('l2'),
  });
}
