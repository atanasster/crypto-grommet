/**
 * Created by atanasster on 6/5/17.
 */
import ComposedProperty from './ComposedProperty';
import BaseForm from '../classes/BaseForm';

class maxNormFields extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'max_value',
      label: 'Max value',
      min: 0,
      max: 100,
      step: 1,
    });
    this.addNumericField({
      name: 'axis',
      label: 'Axis',
      min: 0,
      max: 100,
      step: 1,
    });
  }
}
export default class LayerConstraint extends ComposedProperty {
  static getSettings = (className) => {
    switch (className) {
      case 'max_norm': return maxNormFields;
      default: return null;
    }
  }
}
