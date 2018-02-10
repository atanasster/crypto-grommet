import { Router } from 'express';
import { exchangesList, exchangeInfo } from './exchanges';
import orderBook from './order_book';
import coins from './coins';

export default ({ config, db }) => {
  const api = Router();
  api.use('/exchanges/:exchange', (req, res) => exchangeInfo({ config, db, req, res }));
  api.use('/exchanges', (req, res) => exchangesList({ config, db, req, res }));
  api.get('/order_book/:exchange/:symbol/:toSymbol', (req, res) => orderBook({ config, db, req, res }));
  api.use('/coins', (req, res) => coins({ config, db, req, res }));
  return api;
};
