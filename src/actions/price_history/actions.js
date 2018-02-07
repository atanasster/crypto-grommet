import * as ActionTypes from './constants';
import { addError } from '../errors/actions';


export const getPriceHistorySuccess = (symbol, toSymbol, exchange, data) => ({
  type: ActionTypes.GET_PRICE_HISTORY_SUCCESS,
  exchange,
  symbol,
  toSymbol,
  data,
});

export function getPriceHistory({
  symbol,
  toSymbol,
  exchange,
  unit,
}) {
  return dispatch => fetch(`https://min-api.cryptocompare.com/data/histo${unit}?fsym=${symbol}&tsym=${toSymbol}&limit=60&aggregate=3&e=${exchange}`, {
    method: 'GET',
    // eslint-disable-next-line no-undef
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response =>
      response.json().then(json => ({
        status: response.status,
        json,
      })))
    .then(
      ({ status, json }) => {
        if (status >= 400) {
          return dispatch(addError(json.error));
        }

        return dispatch(getPriceHistorySuccess(symbol, toSymbol, exchange, json.Data));
      },
      err => dispatch(addError(err))
    );
}
