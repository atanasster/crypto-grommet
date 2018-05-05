/**
 * Created by atanasster on 6/5/17.
 */
import ComposedProperty from './ComposedProperty';
import BaseForm from '../classes/BaseForm';

class ConstantFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'value',
      label: 'Value',
      min: 0,
      max: 100,
      step: 1,
    });
  }
}

class NormalFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'mean',
      label: 'Mean',
      min: -1,
      max: 1,
      step: 0.01,
    });
    this.addNumericField({
      name: 'stddev',
      label: 'Standard deviation',
      min: -1,
      max: 1,
      value: 0.01,
    });
    this.addNumericField({
      name: 'seed',
      label: 'Seed',
      min: 1,
      max: 500,
      step: 1,
    });
  }
}

class RandomUniformFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'minval',
      label: 'Minimum value',
      min: -1,
      max: 1,
      step: 0.01,
    });
    this.addNumericField({
      name: 'maxval',
      label: 'Minimum value',
      min: -1,
      max: 1,
      step: 0.01,
    });
    this.addNumericField({
      name: 'seed',
      label: 'Seed',
      min: 1,
      max: 500,
      step: 1,
    });
  }
}

class VarianceScalingFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'scale',
      label: 'Scaling factor',
      min: 0,
      max: 100,
      step: 0.1,
    });
    this.addSelectField({
      name: 'mode',
      label: 'Mode',
      options: [{ 'value': 'fan_in', 'label': 'Fan in' }, {
        'value': 'fan_out',
        'label': 'Fan out',
      }, { 'value': 'fan_avg', 'label': 'Fan average' }],
    });
    this.addSelectField({
      name: 'distribution',
      label: 'Distribution',
      options: [{ 'value': 'normal', 'label': 'Normal' }, {
        'value': 'uniform',
        'label': 'Uniform',
      }],
    });
    this.addNumericField({
      name: 'seed',
      label: 'Seed',
      min: 1,
      max: 500,
      step: 1,
    });
  }
}

class OrthogonalFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'gain',
      label: 'Multiplicative factor',
      min: 1,
      max: 100,
      step: 1,
    });
    this.addNumericField({
      name: 'seed',
      label: 'Seed',
      min: 1,
      max: 500,
      step: 1,
    });
  }
}

class IdentityFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'gain',
      label: 'Multiplicative factor',
      min: 1,
      max: 100,
      step: 1,
    });
  }
}

class SeedFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'seed',
      label: 'Seed',
      min: 1,
      max: 500,
      step: 1,
    });
  }
}

export default class LayerInitializer extends ComposedProperty {
  static getSettings = (className) => {
    switch (className) {
      case 'Constant': return ConstantFields;
      case 'RandomNormal':
      case 'TruncatedNormal':
        return NormalFields;
      case 'RandomUniform': return RandomUniformFields;
      case 'VarianceScaling': return VarianceScalingFields;
      case 'Orthogonal': return OrthogonalFields;
      case 'Identity': return IdentityFields;
      case 'lecun_uniform':
      case 'glorot_normal':
      case 'glorot_uniform':
      case 'he_normal':
      case 'he_uniform': return SeedFields;
      default: return null;
    }
  }
}
