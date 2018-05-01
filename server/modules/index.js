const auth = require('./auth');
const CombineModules = require('./combineModules');

const modules = [auth];

module.exports = new CombineModules(modules);
