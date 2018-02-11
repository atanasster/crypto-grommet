import { RSAA, getJSON } from 'redux-api-middleware';
import * as ActionTypes from './constants';


export default ({ symbol, toSymbol, exchange, period = 'day', limit = 60 }) => ({
  [RSAA]: {
    endpoint: () => (`https://min-api.cryptocompare.com/data/histo${period}?fsym=${symbol}&tsym=${toSymbol}&limit=${limit}&aggregate=3&e=${exchange}`),
    method: 'GET',
    types: [
      ActionTypes.REQUEST_PRICE_HISTORY,
      {
        type: ActionTypes.SUCCESS_PRICE_HISTORY,
        payload: (action, state, res) => getJSON(res).then(json => (
          { symbol, toSymbol, exchange, data: json.Data }
        )),
      },
      ActionTypes.FAILURE_PRICE_HISTORY,
    ],
  },
});
