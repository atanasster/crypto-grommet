import ComposedConfig from '../ComposedConfig';
import ComposedPropertiesRegistry from '../ComposedPropertiesRegistry';
import Dense from './dense';
import SimpleRNN from './simple_rnn';
import GRU from './gru';
import LSTM from './lstm';

const layers = [
  Dense,
  LSTM,
  GRU,
  SimpleRNN,
];

ComposedPropertiesRegistry.registerProperty({
  name: 'layer',
  options: layers,
  DefaultOption: Dense,
  label: 'Layer',
  type: 'Layer',
});

export default class Layer extends ComposedConfig {
  static displayName = 'Layer';
  constructor(value) {
    super();
    this.addComposedProperty({
      name: 'layer',
      options: 'layer',
      value,
    });
  }
  tf = config => this.selfPropValue('layer').tf(config);
}
