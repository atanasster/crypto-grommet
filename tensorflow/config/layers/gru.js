import * as tf from '@tensorflow/tfjs';
import SimpleRNN from './simple_rnn';

export default class GRU extends SimpleRNN {
  static displayName = 'GRU';
  constructor({
    implementation, ...rest
  } = {}) {
    super(rest);
    this.addNumericProperty({
      name: 'implementation',
      label: 'Implementation',
      value: implementation,
    });
  }
   tf = config => tf.layers.gru({
     ...this.tfConfig(config),
     implementation: this.getPropValue('implementation'),
   });
}
