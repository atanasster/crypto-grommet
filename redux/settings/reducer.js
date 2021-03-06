import * as ActionTypes from './constants';

const aggExchange = 'CCCAGG';

const initialState = {
  defaultExchange: 'Bitstamp',
  favCoins: [
    { symbol: 'BTC', toSymbol: 'USD' },
    { symbol: 'XRP', toSymbol: 'USD' },
    { symbol: 'ETH', toSymbol: 'USD' },
    { symbol: 'ADA', toSymbol: 'USD' },
    { symbol: 'BCH', toSymbol: 'USD' },
    { symbol: 'ETC', toSymbol: 'USD' },
  ],
  favEquities: [
    { symbol: 'AAPL' },
    { symbol: 'AMZN' },
    { symbol: 'MSFT' },
    { symbol: 'GOOGL' },
    { symbol: 'FB' },
    { symbol: 'JNJ' },
  ],
  aggregatedExchange: aggExchange,
  defaultCurrency: 'USD',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_DEFAULT_CURRENCY:
      return {
        ...state,
        defaultCurrency: action.currency,
        favCoins: state.favCoins.map(c => ({ symbol: c.symbol, toSymbol: action.currency })),
      };
    case ActionTypes.CHANGE_DEFAULT_EXCHANGE:
      return {
        ...state,
        defaultCurrency: action.exchange,
      };
    default:
      return state;
  }
};
