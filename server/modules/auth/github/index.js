/* eslint-disable no-unused-vars */
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const oAuthtemplate = require('../popupTemplpate');
const socialLoginMutation = require('../social_login_gql');
const request = require('../../graphql_request');

if (process.env.GITHUB_APP_ID) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_APP_ID,
        clientSecret: process.env.GITHUB_APP_SECRET,
        callbackURL: `${process.env.WEBSITE_URL}/auth/github/callback`,
        scope: 'user:email',
        profileFields: ['id', 'emails', 'name', 'displayName', 'picture.type(normal)',
          'profileUrl'],
      },
      (async (accessToken, refreshToken, profile, done) => {
        const {
          id, username, displayName,
          profileUrl, emails: [{ value: email }], photos: [{ value: picture }],
        } = profile;
        try {
          const result = await request(socialLoginMutation, {
            input: {
              username: username || displayName,
              provider: 'github',
              providerId: id,
              email,
              picture,
              url: profileUrl,
            },
          });
          return done(null, result.socialLogin);
        } catch (err) {
          const error = err.response && err.response.errors ? err.response.errors[0].message : err;
          return done(error);
        }
      })
    )
  );

  const middleware = (app) => {
    app.get('/auth/github', (req, res, next) => {
      passport.authenticate('github')(req, res, next);
    });
    app.get('/auth/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
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
