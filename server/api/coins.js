/* eslint-disable no-unused-vars */
import coins from '../models/coins';

export default ({ res, req, config, db }) => {
  res.json({ data: coins() });
};
