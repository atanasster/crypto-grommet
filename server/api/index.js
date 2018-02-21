import { Router } from 'express';
import { exchangesList, exchangeInfo } from './exchanges';
import orderBook from './order_book';
import coins from './coins';
import { signup, login } from './signup';

export default (config) => {
  const api = Router();
  api.use('/exchanges/:exchange', exchangeInfo);
  api.use('/exchanges', exchangesList);
  api.get('/order_book/:exchange/:symbol/:toSymbol', orderBook);
  api.use('/coins', coins);
  api.post('/login', (req, res) => login(req, res, config));
  api.post('/signup', signup);
  return api;
};
