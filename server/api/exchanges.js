/* eslint-disable no-unused-vars */
import list, { exchangeByName } from '../models/exchanges';

export const exchangesList = ({ res, req, config, db }) => {
  res.json({ data: list });
};


export const exchangeInfo = ({ res, req, config, db }) => {
  const { exchange: exchangeName } = req.params;
  const exchange = exchangeByName(exchangeName);
  if (!exchange) {
    res.status(404)
      .send(`Could not find exchange ${exchangeName}`);
  } else {
    res.json({ data: exchange });
  }
};
