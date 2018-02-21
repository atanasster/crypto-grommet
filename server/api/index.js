import { Router } from 'express';
import passport from 'passport';
import { exchangesList, exchangeInfo } from './exchanges';
import orderBook from './order_book';
import coins from './coins';
import { show, signup } from './signup';

export default () => {
  const api = Router();
  api.use('/exchanges/:exchange', exchangeInfo);
  api.use('/exchanges', exchangesList);
  api.get('/order_book/:exchange/:symbol/:toSymbol', orderBook);
  api.use('/coins', coins);
  api.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }));
  api.get('/signup', show);
  api.post('/signup', signup);
  return api;
};
