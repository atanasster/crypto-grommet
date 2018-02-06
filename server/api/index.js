import { Router } from 'express';
import exchanges from './exchanges';
import coins from './coins';
import { version } from '../../public/package.json';

export default ({ config, db }) => {
  const api = Router();

  api.use('/exchanges', exchanges({ config, db }));
  api.use('/coins', coins({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};
