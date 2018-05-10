
class ComposedPropertiesRegistry {
  properties = {};

  registerProperty({
    name, options, DefaultOption, label, type,
  }) {
    this.properties[name] = {
      name, options, DefaultOption, label, type,
    };
  }

  getProperty(name) {
    return this.properties[name];
  }
}


export default new ComposedPropertiesRegistry();
