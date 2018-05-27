/* eslint-disable no-unused-vars */
const passport = require('passport');
const { OAuth2Strategy } = require('passport-google-oauth');
const oAuthtemplate = require('../popupTemplpate');
const socialLoginMutation = require('../social_login_gql');
const request = require('../../graphql_request');


if (process.env.GOOGLE_APP_ID) {
  passport.use(
    new OAuth2Strategy(
      {
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: `${process.env.WEBSITE_URL}/auth/google/callback`,
        profileFields: ['id', 'emails', 'name', 'displayName', 'picture.type(normal)',
          'profileUrl', 'gender'],

      },
      (async (accessToken, refreshToken, profile, done) => {
        const {
          id, username, displayName, name: { givenName: firstName, familyName: lastName },
          _json: { url: profileUrl },
          emails: [{ value: email }], photos: [{ value: picture }], gender,
        } = profile;
        try {
          const result = await request(socialLoginMutation, {
            input: {
              username: username || displayName,
              provider: 'google',
              providerId: id,
              email,
              firstName,
              lastName,
              picture,
              url: profileUrl,
            },
          });
          return done(null, result.socialLogin);
        } catch (err) {
          const error = err.response && err.response.errors ? err.response.errors[0].message : err;
          return done(error, {});
        }
      })
    )
  );

  const middleware = (app) => {
    app.use(passport.initialize());
    app.get('/auth/google', (req, res, next) => {
      passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
      })(req, res, next);
    });

    app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
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
