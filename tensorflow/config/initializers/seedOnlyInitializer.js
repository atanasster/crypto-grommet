import BaseConfig from '../BaseConfig';

export default class SeedOnlyInitializer extends BaseConfig {
  static displayName = 'SeedOnlyInitializer';
  constructor({
    seed,
  } = {}) {
    super();
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
