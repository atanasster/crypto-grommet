/* eslint-disable no-unused-vars */
const passport = require('passport');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const oAuthtemplate = require('../popupTemplpate');
const socialLoginMutation = require('../social_login_gql');
const request = require('../../graphql_request');


if (process.env.LINKEDIN_APP_ID) {
  passport.use(
    new LinkedinStrategy(
      {
        clientID: process.env.LINKEDIN_APP_ID,
        clientSecret: process.env.LINKEDIN_APP_SECRET,
        callbackURL: `${process.env.WEBSITE_URL}/auth/linkedin/callback`,
        scope: ['r_basicprofile', 'r_emailaddress'],
      },
      (async (accessToken, refreshToken, profile, done) => {
        const {
          id, username, displayName, name: { givenName: firstName, familyName: lastName },
          _json: { publicProfileUrl: profileUrl },
          emails: [{ value: email }], photos: [{ value: picture }], gender,
        } = profile;
        try {
          const result = await request(socialLoginMutation, {
            input: {
              username: username || displayName,
              provider: 'linkedin',
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
    app.get('/auth/linkedin', (req, res, next) => {
      passport.authenticate('linkedin')(req, res, next);
    });

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { session: false }), (req, res) => {
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
