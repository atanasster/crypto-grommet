/**
 * Created by atanasster on 6/5/17.
 */
import ComposedProperty from './ComposedProperty';
import BaseForm from '../classes/BaseForm';
import BaseLayer from '../classes/BaseLayer';

class ThresholdedReLUFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'theta',
      label: 'Theta',
      help: 'Threshold location of activation',
      min: 0,
      max: 1,
      step: 0.1,
    });
  }
}

class LeakyReLUFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'alpha',
      label: 'Alpha',
      min: 0,
      max: 50,
      step: 0.1,
    });
  }
}

class PReLUFields extends BaseLayer {
  constructor(props) {
    super(props);
    this.addInitializerProperty('alpha_initializer', 'Alpha initializer', '');
    this.addRegularizerProperty('alpha_regularizer', 'Alpha regularizer', '');
    this.addRegularizerProperty('alpha_constraint', 'Alpha constraint', '');
  }
}

export default class LayerActivation extends ComposedProperty {
  static getSettings = (className) => {
    switch (className) {
      // case 'softmax' : return SoftMaxFields
      // case 'elu' : return eluFields
      // case 'relu' : return reluFields
      case 'ThresholdedReLU': return ThresholdedReLUFields;
      case 'LeakyReLU': return LeakyReLUFields;
      case 'PReLU':
      case 'ELU': return PReLUFields;
      default: return null;
    }
  }
}
