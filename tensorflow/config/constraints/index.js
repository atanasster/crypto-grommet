import ComposedConfig from '../ComposedConfig';
import ComposedPropertiesRegistry from '../ComposedPropertiesRegistry';
import MinMaxNorm from './minmax_norm';
import MaxMaxNorm from './max_norm';
import NonNeg from './nonneg';
import UniNorm from './uni_norm';

const constraints = [
  MaxMaxNorm,
  MinMaxNorm,
  NonNeg,
  UniNorm,
];

ComposedPropertiesRegistry.registerProperty({
  name: 'constraint',
  options: constraints,
  DefaultOption: undefined,
  label: 'Constraint',
  type: 'Constraint',
});

export default class Constraint extends ComposedConfig {
  static displayName = 'Constraint';
  constructor(value) {
    super();
    this.addComposedProperty({
      name: 'constraint',
      options: 'constraint',
      value,
    });
  }
  tf = () => this.selfPropValue('constraint').tf();
}
