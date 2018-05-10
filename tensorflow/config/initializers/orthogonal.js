import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class Orthogonal extends BaseConfig {
  static displayName = 'Orthogonal';
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
  tf = () => tf.initializers.orthogonal({
    gain: this.getPropValue('gain'),
  });
}
