import passportFacebook from 'passport-facebook';
import { User } from '../db/models';
import oAuthtemplate from './popupTemplpate';

export default (config) => {
  const passportConfig = {
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: `http://localhost:${config.PORT}/api/auth/facebook/redirect`,
    profileFields: ['id', 'emails', 'name', 'displayName', 'picture.type(normal)',
      'profileUrl', 'gender'],
  };
  if (passportConfig.clientID) {
    return new passportFacebook.Strategy(passportConfig,
      (accessToken, refreshToken, profile, done) => {
        User.findOne({
          where: {
            'social_id': profile.id,
            'social_provider': 'facebook',
          },
        }).then((user) => {
          if (!user) {
            const newUser = User.create({
              username: profile.displayName,
              social_provider: 'facebook',
              social_id: profile.id,
            })
              .then(() => done(oAuthtemplate({ title: 'Success', status: 'usercreated', payload: newUser }), newUser))
              .catch(() => {
                done(oAuthtemplate({ title: 'Error', status: 'error', payload: 'Could not create user' }), null);
              });
          } else {
            done(oAuthtemplate({ title: 'Success', status: 'loggedin', payload: user }), user);
          }
        });
      });
  }
  return null;
};
