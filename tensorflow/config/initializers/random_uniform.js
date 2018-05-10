import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class RandomUniform extends BaseConfig {
  static displayName = 'Random uniform';
  constructor({
    min, max, seed,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'min',
      label: 'Min',
      value: min,
      defaultValue: undefined,
      step: 0.01,
    });
    this.addNumericProperty({
      name: 'max',
      label: 'Max',
      value: max,
    });
    this.addNumericProperty({
      name: 'seed',
      label: 'Seed',
      value: seed,
      defaultValue: undefined,
      min: 1,
      max: 500,
      step: 1,
    });
  }
  tf = () => tf.initializers.randomUniform({
    minval: this.getPropValue('min'),
    maxval: this.getPropValue('max'),
    seed: this.getPropValue('seed'),
  });
}
