import ComposedPropertiesRegistry from './ComposedPropertiesRegistry';

export default class BaseConfig {
  constructor() {
    this.properties = [];
  }

  propByName(name) {
    return this.properties.find(prop => prop.name === name);
  }
  getPropValue(name) {
    const prop = this.propByName(name);
    return prop ? prop.value : undefined;
  }
  tfPropValue(name) {
    const prop = this.propByName(name);
    return prop && prop.value ? prop.value.tf() : undefined;
  }

  get displayName() {
    return this.constructor.displayName;
  }

  setPropValue(name, value) {
    const prop = this.propByName(name);
    if (prop) {
      if (prop.type === 'composed') {
        const Option = prop.options.find(item => item.displayName === value);
        if (Option !== undefined) {
          prop.value = value;
        }
      } else {
        prop.value = value;
      }
    }
  }
  get streamable() {
    return this.properties.reduce((obj, prop) =>
      ({ ...obj, [prop.name]: prop.streamable || prop.value }), {});
  }

  set value(props) {
    this.properties.forEach(prop => this.setValue(prop.name, props[prop.name]));
  }

  addProperty(dataType, props) {
    const { value, defaultValue } = props;
    this.properties.push({
      ...props,
      value: value !== undefined ? value : defaultValue,
      defaultValue,
      dataType,
    });
  }

  addTextProperty(props) {
    this.addProperty('text', props);
  }

  addNumericProperty(props) {
    this.addProperty('number', props);
  }

  addSelectProperty(props) {
    this.addProperty('select', props);
  }

  addBooleanProperty(props) {
    this.addProperty('bool', props);
  }

  addColorProperty(props) {
    this.addProperty('color', props);
  }

  addComposedProperty(props) {
    const {
      value, label, options, ...rest
    } = props;
    const property = ComposedPropertiesRegistry.getProperty(options);
    if (property === undefined) {
      throw new Error(`Composed property not found ${options}`);
    }
    let objectProp;
    if (value) {
      const v = value.config && value.config.type ? value.config : value;
      const Option = property.options.find(item => item.displayName === v.type);
      if (Option !== undefined) {
        objectProp = new Option(v);
      }
    }

    if (!objectProp && property.DefaultOption !== undefined) {
      objectProp = new property.DefaultOption();
    }

    this.addProperty('composed', {
      ...rest,
      value: objectProp,
      options: property.options,
      label: label || property.label,
      type: property.type,
      defaultValue: property.DefaultOption ? new property.DefaultOption() : undefined,
    });
  }

  tf = () => {
    throw new Error('Abstract function');
  }
}
