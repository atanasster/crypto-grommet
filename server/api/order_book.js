/* eslint-disable no-unused-vars */
import { findByName } from '../models/exchanges';
import { symbolParities } from '../api/utils';

const sendResult = (res, orderBook, exchange, symbol, toSymbol, realToSymbol) => {
  if (orderBook && (orderBook.asks.length || orderBook.bids.length)) {
    res.json({ data: orderBook, exchange, symbol, toSymbol, realToSymbol });
  } else {
    res.status(404)
      .send(`Could not fetch ${toSymbol} Order Book for ${exchange}`);
  }
};

export default ({ res, req, config, db }) => {
  const { exchange: exchangeName, symbol, toSymbol } = req.params;
  const exchange = findByName(exchangeName);
  if (!exchange) {
    res.status(404)
      .send(`Could not find exchange ${exchangeName}`);
  } else if (!exchange.has.fetchOrderBook) {
    res.status(404)
      .send(`Exchange ${exchangeName} has no fetchOrderBook`);
  } else {
    exchange.fetchOrderBook(`${symbol}/${toSymbol}`)
      .then((orderBook) => {
        sendResult(res, orderBook, exchangeName, symbol, toSymbol, toSymbol);
      })
      .catch(() => {
        if (symbolParities[toSymbol]) {
          exchange.fetchOrderBook(`${symbol}/${symbolParities[toSymbol]}`)
            .then((orderBook) => {
              sendResult(res, orderBook, exchangeName, symbol, toSymbol, symbolParities[toSymbol]);
            })
            .catch((err) => {
              res.status(404)
                .send(`Could not fetch ${symbolParities[toSymbol]} Order Book for ${exchangeName}`);
            });
        } else {
          res.status(404)
            .send(`Could not fetch ${toSymbol} Order Book for ${exchangeName}`);
        }
      });
  }
};
