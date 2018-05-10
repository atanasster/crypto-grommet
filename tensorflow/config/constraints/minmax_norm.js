import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class MinMaxNorm extends BaseConfig {
  static displayName = 'MinMax norm';
  constructor({
    min, max, axis, rate,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'min',
      label: 'Min',
      value: min,
      min: 0,
      max: 100,
      step: 1,
    });
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
    this.addNumericProperty({
      name: 'rate',
      label: 'rate',
      value: rate,
      defaultValue: undefined,
      min: 0,
      max: 1,
      step: 0.01,
    });
  }
  tf = () => tf.constraints.minMaxNorm({
    minValue: this.getPropValue('min'),
    maxValue: this.getPropValue('max'),
    axis: this.getPropValue('axis'),
    rate: this.getPropValue('rate'),
  });
}
