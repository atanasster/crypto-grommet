import L1 from './l1';
import L2 from './l2';
import L1L2 from './l1l2';
import ComposedConfig from '../ComposedConfig';
import ComposedPropertiesRegistry from '../ComposedPropertiesRegistry';

const regularizers = [
  L1,
  L2,
  L1L2,
];

ComposedPropertiesRegistry.registerProperty({
  name: 'regularizer',
  options: regularizers,
  DefaultOption: undefined,
  label: 'Regularizer',
  type: 'Regularizer',
});

export default class Regularizer extends ComposedConfig {
  static displayName = 'Regularizer';
  constructor(value) {
    super();
    this.addComposedProperty({
      name: 'regularizer',
      options: 'regularizer',
      value,
    });
  }
  tf = () => this.selfPropValue('regularizer').tf();
}
