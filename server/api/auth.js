import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../passport/jwt';
import { signup, login } from '../passport/signup';

export default (config) => {
  const router = Router();
  router.post('/login', (req, res) => login(req, res, config));
  router.post('/signup', signup);
  router.get('/facebook/start', passport.authenticate('facebook', { session: false, scope: ['email'] }));
  router.get('/facebook/redirect', passport.authenticate('facebook', { session: false }),
    id => generateToken(id, config));
  return router;
};
