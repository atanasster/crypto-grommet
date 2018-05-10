import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class MaxNorm extends BaseConfig {
  static displayName = 'Max norm';
  constructor({
    max, axis,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'max',
      label: 'Max',
      value: max,
      min: 0,
      max: 100,
      step: 1,
    });
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
  tf = () => tf.constraints.maxNorm({
    maxValue: this.getPropValue('max'),
    axis: this.getPropValue('axis'),
  });
}
