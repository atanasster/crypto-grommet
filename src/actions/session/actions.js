import { RSAA } from 'redux-api-middleware';
import * as ActionTypes from './constants';
import { apiServer } from '../api/api';

export const requestLogin = ({ username, password }) => ({
  [RSAA]: {
    endpoint: `${apiServer}/auth/login`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    method: 'POST',
    types: [
      ActionTypes.REQUEST_LOGIN,
      ActionTypes.SUCCESS_LOGIN,
      ActionTypes.FAILURE_LOGIN,
    ],
  },
});

export const requestSignup = ({ username, email, password, password2 }) => ({
  [RSAA]: {
    endpoint: `${apiServer}/auth/signup`,
    body: { username, email, password, password2 },
    method: 'POST',
    types: [
      ActionTypes.REQUEST_LOGIN,
      ActionTypes.SUCCESS_LOGIN,
      ActionTypes.FAILURE_LOGIN,
    ],
  },
});
