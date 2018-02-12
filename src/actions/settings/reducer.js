
const aggExchange = 'CCCAGG';

const initialState = {
  defaultExchange: 'Bitstamp',
  favCoins: [
    { symbol: 'BTC', toSymbol: 'USD' },
    { symbol: 'ETH', toSymbol: 'USD' },
    { symbol: 'LTC', toSymbol: 'USD' },
    { symbol: 'BCH', toSymbol: 'USD' },
    { symbol: 'ETC', toSymbol: 'USD' },
    { symbol: 'XRP', toSymbol: 'USD' },
  ],
  aggregatedExchange: aggExchange,
};

export default (state = initialState) => state;
