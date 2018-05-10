import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class VarianceScaling extends BaseConfig {
  static displayName = 'Variance scaling';
  constructor({
    scale, seed, mode, distribution,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'scale',
      label: 'Scaling factor',
      value: scale,
      defaultValue: undefined,
      min: 1,
      max: 100,
      step: 0.1,
    });
    this.addSelectProperty({
      name: 'mode',
      label: 'Mode',
      value: mode,
      options: [
        { 'value': 'fanIn', 'label': 'Fan in' },
        { 'value': 'fanOut', 'label': 'Fan out' },
        { 'value': 'fanAvg', 'label': 'Fan average' },
      ],
    });
    this.addSelectProperty({
      name: 'distribution',
      label: 'Distribution',
      value: distribution,
      options: [
        { 'value': 'normal', 'label': 'Normal' },
        { 'value': 'uniform', 'label': 'Uniform' },
      ],
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
  tf = () => tf.initializers.varianceScaling({
    scale: this.getPropValue('scale'),
    mode: this.getPropValue('mode'),
    distribution: this.getPropValue('distribution'),
    seed: this.getPropValue('seed'),
  });
}
