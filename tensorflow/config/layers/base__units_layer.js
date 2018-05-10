import BaseLayer from './base_layer';

export default class BaseUnitsLayer extends BaseLayer {
  static displayName = 'BaseUnitsLayer';
  constructor({
    units, ...rest
  } = {}) {
    super(rest);
    this.addNumericProperty({
      name: 'units',
      label: 'Units',
      help: 'output units of the layer',
      min: 1,
      max: 50,
      step: 1,
      value: units,
      defaultValue: 1,
    });
  }
}
