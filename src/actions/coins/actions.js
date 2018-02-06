import { addError } from '../errors/actions';
import * as ActionTypes from './constants';


export const getCoinsSuccess = coins => ({
  type: ActionTypes.GET_COINS_SUCCESS,
  coins,
});


export function getCoins() {
  return (dispatch, getState) => {
    const { url } = getState().api;
    return fetch(`${url}/coins`, {
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

          return dispatch(getCoinsSuccess(json.data));
        },
        err => dispatch(addError(err))
      );
  };
}
