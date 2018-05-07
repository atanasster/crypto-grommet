
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

  setPropValue(name, value) {
    const prop = this.propByName(name);
    if (prop) {
      prop.value = value;
    }
  }
  getValue() {
    return this.properties.reduce((obj, prop) => ({ ...obj, [prop.name]: prop.value }), {});
  }

  setValue(props) {
    this.properties.forEach(prop => this.setValue(prop.name, props[prop.name]));
  }


  addProperty(type, props) {
    const { value, defaultValue } = props;
    this.properties.push({
      ...props,
      value: value !== undefined ? value : defaultValue,
      defaultValue,
      type,
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

  addComposedProperty(props) {
    this.addProperty('composed', props);
  }

  tf = () => {
    throw new Error('Abstract function');
  }
}
