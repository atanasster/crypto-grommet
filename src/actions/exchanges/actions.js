import { RSAA } from 'redux-api-middleware';
import { apiServer } from '../api/api';
import * as ActionTypes from './constants';


export default {
  [RSAA]: {
    endpoint: `${apiServer}/exchanges`,
    method: 'GET',
    types: [
      ActionTypes.REQUEST_EXCHANGES_LIST,
      ActionTypes.SUCCESS_EXCHANGES_LIST,
      ActionTypes.FAILURE_EXCHANGES_LIST,
    ],
  },
};

