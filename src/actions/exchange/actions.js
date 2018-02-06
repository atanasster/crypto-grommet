import { addError } from '../errors/actions';
import * as ActionTypes from './constants';


export const startGetExchangeInfo = exchangeId => ({
  type: ActionTypes.START_GET_EXCHANGE_INFO,
  id: exchangeId,
});


export const getExchangeInfoSuccess = (exchangeId, exchange) => ({
  type: ActionTypes.GET_EXCHANGE_INFO_SUCCESS,
  id: exchangeId,
  exchange,
});


export function getExchangeInfo(exchangeId) {
  return (dispatch, getState) => {
    if (getState().exchange[exchangeId] !== undefined) {
      return null;
    }
    const { url } = getState().api;
    dispatch(startGetExchangeInfo(exchangeId));
    return fetch(`${url}/exchanges/${exchangeId}`, {
      method: 'GET',
      // eslint-disable-next-line no-undef
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(response =>
        response.json()
          .then(json => ({
            status: response.status,
            json,
          }))
      )
      .then(({ status, json }) => {
        if (status >= 400) {
          return dispatch(addError(json.error));
        }
        return dispatch(getExchangeInfoSuccess(exchangeId, json));
      },
      err => dispatch(addError(err))
      );
  };
}
