/* eslint-disable no-unused-vars */
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const oAuthtemplate = require('../popupTemplpate');
const socialLoginMutation = require('../social_login_gql');
const request = require('../../graphql_request');

if (process.env.FACEBOOK_APP_ID) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.WEBSITE_URL}/auth/facebook/callback`,
        scope: ['email'],
        profileFields: ['id', 'emails', 'name', 'displayName', 'picture.type(normal)',
          'profileUrl'],
      },
      (async (accessToken, refreshToken, profile, done) => {
        const {
          id, username, displayName, name: { givenName: firstName, familyName: lastName },
          profileUrl, emails: [{ value: email }], photos: [{ value: picture }],
        } = profile;
        try {
          const result = await request(socialLoginMutation, {
            input: {
              username: username || displayName,
              provider: 'facebook',
              providerId: id,
              email,
              firstName,
              lastName,
              picture,
              url: profileUrl,
            },
          });
          done(null, result.socialLogin);
        } catch (err) {
          console.log(err);
          const error = err.response && err.response.errors ? err.response.errors[0].message : err;
          done(error, {});
        }
      })
    )
  );

  const middleware = (app) => {
    app.use(passport.initialize());
    app.get('/auth/facebook', (req, res, next) => {
      passport.authenticate('facebook')(req, res, next);
    });
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), async (req, res) => {
      console.log('/auth/facebook/callback', req);
      const { user, token } = req.user;
      res.send(oAuthtemplate({
        title: 'Success',
        status: 'success',
        payload: { user, token },
      }));
    });
  };

  module.exports = {
    middleware,
  };
} else {
  module.exports = {
  };
}
