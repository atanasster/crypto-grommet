import passport from 'passport';
import jwtStrategy from './jwt';
import facebookStrategy from './facebook';

export default (app, config) => {
  app.use(passport.initialize());
  passport.use(jwtStrategy(config));
  passport.use(facebookStrategy(config));
};

export const authenticated = () => passport.authenticate('jwt', { session: false });
