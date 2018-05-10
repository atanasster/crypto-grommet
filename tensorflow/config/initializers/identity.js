import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';

export default class Identity extends BaseConfig {
  static displayName = 'Identity';
  constructor({
    gain,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'gain',
      label: 'Gain',
      value: gain,
    });
  }
  tf = () => tf.initializers.identity({
    gain: this.getPropValue('gain'),
  });
}
