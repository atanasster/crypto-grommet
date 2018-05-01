
class CombineModules {
  constructor(modules) {
    this.modules = [];
    modules.forEach((module) => {
      if (Array.isArray(module)) {
        this.modules = this.modules.concat(module);
      } else {
        this.modules.push(module);
      }
    });
  }

  middleware(app) {
    this.modules.filter(module => module.middleware)
      .forEach((module) => { module.middleware(app); });
  }
}

module.exports = CombineModules;
