import { RSAA } from 'redux-api-middleware';
import * as ActionTypes from './constants';
import { apiServer } from '../api/api';

export default {
  [RSAA]: {
    endpoint: `${apiServer}/coins`,
    method: 'GET',
    types: [
      ActionTypes.REQUEST_COINS_LIST,
      ActionTypes.SUCCESS_COINS_LIST,
      ActionTypes.FAILURE_COINS_LIST,
    ],
  },
};
