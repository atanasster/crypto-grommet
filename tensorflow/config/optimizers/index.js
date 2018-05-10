import SGD from './sgd';
import Momentum from './momentum';
import RMSProp from './rmsprop';
import Adam from './adam';
import AdaDelta from './adadelta';
import AdaMax from './adamax';
import AdaGrad from './adagrad';
import ComposedConfig from '../ComposedConfig';
import ComposedPropertiesRegistry from '../ComposedPropertiesRegistry';

const optimizers = [
  SGD,
  Momentum,
  RMSProp,
  Adam,
  AdaDelta,
  AdaMax,
  AdaGrad,
];

ComposedPropertiesRegistry.registerProperty({
  name: 'optimizer',
  options: optimizers,
  DefaultOption: Adam,
  label: 'Optimizer',
  type: 'Optimizer',
});

export default class Optimizer extends ComposedConfig {
  static displayName = 'Optimizer';
  constructor(value) {
    super();
    this.addComposedProperty({
      name: 'optimizer',
      options: 'optimizer',
      value,
    });
  }
  tf = () => this.selfPropValue('optimizer').tf();
}
