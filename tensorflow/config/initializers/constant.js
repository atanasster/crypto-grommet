import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class Constant extends BaseConfig {
  static displayName = 'Constant';
  constructor({
    constant,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'constant',
      label: 'Value',
      value: constant,
    });
  }
  tf = () => tf.initializers.constant({
    value: this.getPropValue('constant'),
  });
}
