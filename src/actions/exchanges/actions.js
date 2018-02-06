import { addError } from '../errors/actions';
import * as ActionTypes from './constants';


export const getExchangesSuccess = exchanges => ({
  type: ActionTypes.GET_EXCHANGES_SUCCESS,
  exchanges,
});

export const exchangesLoaded = exchanges => ({ type: ActionTypes.EXCHANGES_LOADED, exchanges });


export function getExchanges() {
  return (dispatch, getState) => {
    const { url } = getState().api;
    return fetch(`${url}/exchanges`, {
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

          dispatch(getExchangesSuccess(json));
          return dispatch(exchangesLoaded(getState().exchanges.all));
        },
        // eslint-disable-next-line no-unused-vars
        err => dispatch(addError(err))
      );
  };
}
