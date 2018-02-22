import { Router } from 'express';
import { exchangesList, exchangeInfo } from './exchanges';
import orderBook from './order_book';
import coins from './coins';
import auth from './auth';

export default (config) => {
  const router = Router();
  router.use('/exchanges/:exchange', exchangeInfo);
  router.use('/exchanges', exchangesList);
  router.get('/order_book/:exchange/:symbol/:toSymbol', orderBook);
  router.use('/coins', coins);
  router.use('/auth', auth(config));
  return router;
};
