import list, { exchangeByName } from '../models/exchanges';

export const exchangesList = (req, res) => {
  res.json({ data: list });
};


export const exchangeInfo = (req, res) => {
  const { exchange: exchangeName } = req.params;
  const exchange = exchangeByName(exchangeName);
  if (!exchange) {
    res.status(404)
      .send(`Could not find exchange ${exchangeName}`);
  } else {
    res.json({ data: exchange });
  }
};
