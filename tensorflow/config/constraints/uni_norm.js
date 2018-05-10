import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class UniNorm extends BaseConfig {
  static displayName = 'Uni norm';
  constructor({
    axis,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'axis',
      label: 'Axis',
      value: axis,
      defaultValue: undefined,
      min: 0,
      max: 100,
      step: 1,
    });
  }
  tf = () => tf.constraints.unitNorm({
    axis: this.getPropValue('axis'),
  });
}
