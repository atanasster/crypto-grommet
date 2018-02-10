import { RSAA } from 'redux-api-middleware';
import * as ActionTypes from './constants';
import { apiServer } from '../api/api';

export default ({ symbol, toSymbol, exchange }) => ({
  [RSAA]: {
    endpoint: () => (`${apiServer}/order_book/${exchange}/${symbol}/${toSymbol}`),
    method: 'GET',
    types: [
      {
        type: ActionTypes.REQUEST_ORDER_BOOK,
        payload: () => ({ symbol, toSymbol, exchange }),
      },
      ActionTypes.SUCCESS_ORDER_BOOK,
      ActionTypes.FAILURE_ORDER_BOOK,
    ],
  },
});
