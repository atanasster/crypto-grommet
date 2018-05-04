/**
 * Created by atanasster on 6/5/17.
 */
import ComposedProperty from './ComposedProperty';
import BaseForm from '../classes/BaseForm';

class LFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'l',
      label: 'Parameter',
      min: 0,
      max: 1,
      step: 0.01,
    });
  }
}

class L1L2Fields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'l1',
      label: 'L1 parameter',
      min: 0,
      max: 1,
      step: 0.01,
    });
    this.addNumericField({
      name: 'l2',
      label: 'L2 parameter',
      min: 0,
      max: 1,
      step: 0.01,
    });
  }
}
export default class LayerRegularizer extends ComposedProperty {
  static getSettings = (className) => {
    switch (className) {
      case 'l1':
      case 'l2': return LFields;
      case 'l1_l2': return L1L2Fields;
      default: return null;
    }
  }
}
