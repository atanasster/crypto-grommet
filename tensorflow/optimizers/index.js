import SGD from './sgd';
import Momentum from './momentum';
import RMSProp from './rmsprop';
import Adam from './adam';
import AdaDelta from './adadelta';
import AdaMax from './adamax';
import AdaGrad from './adagrad';
import BaseConfig from '../BaseConfig';

const optimizers = [
  SGD,
  Momentum,
  RMSProp,
  Adam,
  AdaDelta,
  AdaMax,
  AdaGrad,
];

export default class Optimizer extends BaseConfig {
  static displayName = 'Optimizer';
  constructor(value) {
    super();
    let optimizer;
    if (value) {
      const Option = optimizers.find(item => item.displayName === value.name);
      if (Option !== undefined) {
        optimizer = new Option(value.config);
      }
    }
    if (!optimizer) {
      optimizer = new Adam();
    }
    this.addComposedProperty({
      name: 'optimizer',
      label: 'Optimizer',
      options: optimizers,
      value: optimizer,
      defaultValue: new Adam(),
    });
  }
  setPropValue(name, value) {
    const Option = optimizers.find(item => item.displayName === value);
    if (Option !== undefined) {
      super.setPropValue(name, Option);
    }
  }
  tf = () => this.getPropValue('optimizer').tf();
}
