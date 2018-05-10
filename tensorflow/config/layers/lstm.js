import * as tf from '@tensorflow/tfjs';
import SimpleRNN from './simple_rnn';

export default class LSTM extends SimpleRNN {
  static displayName = 'LSTM';
  constructor({
    implementation, unitForgetBias, ...rest
  } = {}) {
    super(rest);
    this.addBooleanProperty({
      name: 'unitForgetBias',
      label: 'Unit forget bias',
      value: unitForgetBias,
    });
    this.addNumericProperty({
      name: 'implementation',
      label: 'Implementation',
      value: implementation,
    });
  }
   tf = config => tf.layers.lstm({
     ...this.tfConfig(config),
     unitForgetBias: this.getPropValue('unroll'),
     implementation: this.getPropValue('unitForgetBias'),
   });
}
