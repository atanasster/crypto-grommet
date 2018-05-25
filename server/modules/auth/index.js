const email = require('./email');
const facebook = require('./facebook');
const google = require('./google');
const linkedin = require('./linkedin');
const github = require('./github');
const CombineModules = require('../combineModules');


// module.exports = props;
module.exports = new CombineModules([email, facebook, google, linkedin, github]);
