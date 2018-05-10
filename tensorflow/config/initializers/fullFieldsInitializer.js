import BaseConfig from '../BaseConfig';

export default class FullFieldsInitializer extends BaseConfig {
  static displayName = 'FullFieldsInitializer';
  constructor({
    mean, stddev, seed,
  } = {}) {
    super();
    this.addNumericProperty({
      name: 'mean',
      label: 'Mean',
      value: mean,
      defaultValue: 0.0,
      min: -1,
      max: 1,
      step: 0.01,
    });
    this.addNumericProperty({
      name: 'stddev',
      label: 'Std. dev',
      value: stddev,
      defaultValue: 0.01,
      min: -1,
      max: 1,
      step: 0.01,
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
}
