import { RSAA } from 'redux-api-middleware';
import { apiServer } from '../api/api';
import * as ActionTypes from './constants';


export default name => ({
  [RSAA]: {
    endpoint: () => (`${apiServer}/exchanges/${name}`),
    method: 'GET',
    types: [
      {
        type: ActionTypes.REQUEST_EXHANGE_INFO,
        payload: () => ({ name }),
      },
      ActionTypes.SUCCESS_EXHANGE_INFO,
      ActionTypes.FAILURE_EXHANGE_INFO,
    ],
  },
});
