/* eslint-disable no-unused-vars */
import { exchanges } from '../models/exchanges';
import { symbolParities } from '../api/utils';

export default ({
  socket, symbol, toSymbol, config, db,
}) => {
  exchanges.forEach((exchange) => {
    if (exchange.markets) {
      let market = exchange.markets[`${symbol}/${toSymbol}`];
      if (!market && symbolParities[toSymbol]) {
        market = exchange.markets[`${symbol}/${symbolParities[toSymbol]}`];
      }
      if (market && exchange.has.fetchOrderBook) {
        exchange.fetchOrderBook(market.symbol)
          .then((data) => {
            if (data) {
              socket.emit('order_book_data', {
                exchange: exchange.id,
                symbol: market.symbol,
                data,
              });
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    }
  });
};
