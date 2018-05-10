import BaseConfig from '../BaseConfig';

export default class BaseLayer extends BaseConfig {
  static displayName = 'BaseLayer';
  constructor({
    name, type, background, defaultBackground,
  } = {}) {
    super();
    this.addTextProperty({
      name: 'name',
      label: 'Name',
      help: 'name of the layer',
      value: name || type,
      defaultValue: 'Dense',
    });
    this.addColorProperty({
      name: 'background',
      label: 'Background',
      value: background,
      defaultValue: defaultBackground,
    });
  }
}
