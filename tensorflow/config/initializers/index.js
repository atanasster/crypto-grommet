import Constant from './constant';
import ComposedConfig from '../ComposedConfig';
import ComposedPropertiesRegistry from '../ComposedPropertiesRegistry';
import GlorotNormal from './glorotNormal';
import GlorotUniform from './glorotUniform';
import HeNormal from './heNormal';
import Identity from './identity';
import LeCunNormal from './leCunNormal';
import Ones from './ones';
import Orthogonal from './orthogonal';
import RandomNormal from './randomnormal';
import RandomUniform from './random_uniform';
import VarianceScaling from './variance_scaling';
import Zeros from './zeros';

const initializers = [
  Constant,
  GlorotNormal,
  GlorotUniform,
  HeNormal,
  Identity,
  LeCunNormal,
  Ones,
  Orthogonal,
  RandomNormal,
  RandomUniform,
  VarianceScaling,
  Zeros,
];

ComposedPropertiesRegistry.registerProperty({
  name: 'initializer',
  options: initializers,
  DefaultOption: undefined,
  label: 'Initializer',
  type: 'Initializer',
});

export default class Initializer extends ComposedConfig {
  static displayName = 'Initializer';
  constructor(value) {
    super();
    this.addComposedProperty({
      name: 'initializer',
      options: 'initializer',
      value,
    });
  }
  tf = () => this.selfPropValue('initializer').tf();
}
