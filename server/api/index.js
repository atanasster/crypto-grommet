import { Router } from 'express';
import exchanges from './exchanges';
import coins from './coins';

export default ({ config, db }) => {
  const api = Router();

  api.use('/exchanges', exchanges({ config, db }));
  api.use('/coins', coins({ config, db }));

  return api;
};
