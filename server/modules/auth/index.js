const passport = require('passport');
const email = require('./email');
const facebook = require('./facebook');
const google = require('./google');
const linkedin = require('./linkedin');
const github = require('./github');
const CombineModules = require('../combineModules');

class AuthModules extends CombineModules {
  middleware(app) {
    app.use(passport.initialize());
    super.middleware(app);
  }
}

// module.exports = props;
module.exports = new AuthModules([email, facebook, google, linkedin, github]);
