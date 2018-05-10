import BaseConfig from './BaseConfig';

export default class ComposedConfig extends BaseConfig {
  getPropValue(name) {
    const composed = this.properties[0];
    return composed.value.getPropValue(name);
  }
  selfPropValue(name) {
    return super.getPropValue(name);
  }
  get displayName() {
    const composed = this.properties[0];
    return composed.value.displayName;
  }
  setPropValue(name, value) {
    const composed = this.properties[0];
    return composed.value.setPropValue(name, value);
  }

  get container() {
    return this.properties[0];
  }

  get streamable() {
    const composed = this.properties[0];
    return {
      type: this.constructor.displayName,
      name: composed.name,
      config: { type: composed.value.displayName, ...composed.value.streamable },
    };
  }
}
