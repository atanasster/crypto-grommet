import { RSAA } from 'redux-api-middleware';
import * as ActionTypes from './constants';


export const requestMarketCapTable = ({ currency, start = 0, limit = 60 }) => ({
  [RSAA]: {
    endpoint: () => (`https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&start=${start}&limit=${limit}`),
    method: 'GET',
    types: [
      ActionTypes.REQUEST_MARKET_CAP_TABLE,
      ActionTypes.SUCCESS_MARKET_CAP_TABLE,
      ActionTypes.FAILURE_MARKET_CAP_TABLE,
    ],
  },
});

export const requestMarketCapDistribution = ({ currency, start = 0, limit = 25 }) => ({
  [RSAA]: {
    endpoint: () => (`https://api.coinmarketcap.com/v1/ticker/?convert=${currency}&start=${start}&limit=${limit}`),
    method: 'GET',
    types: [
      ActionTypes.REQUEST_MARKET_CAP_DUSTRIBUTION,
      ActionTypes.SUCCESS_MARKET_CAP_DUSTRIBUTION,
      ActionTypes.FAILURE_MARKET_CAP_DUSTRIBUTION,
    ],
  },
});


export const requestMarketCapGlobal = currency => ({
  [RSAA]: {
    endpoint: () => (`https://api.coinmarketcap.com/v1/global/?convert=${currency}`),
    method: 'GET',
    types: [
      ActionTypes.REQUEST_MARKET_CAP_GLOBAL,
      ActionTypes.SUCCESS_MARKET_CAP_GLOBAL,
      ActionTypes.FAILURE_MARKET_CAP_GLOBAL,
    ],
  },
});
