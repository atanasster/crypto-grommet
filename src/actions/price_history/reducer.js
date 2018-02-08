import * as ActionTypes from './constants';
import { actionToKey } from '../price_stream/constants';

const initialState = {};


export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRICE_HISTORY_SUCCESS:
      return {
        ...state,
        [actionToKey(action)]: {
          symbol: action.symbol,
          toSymbol: action.toSymbol,
          exchange: action.exchange,
          data: action.data,
        },
      };
    case ActionTypes.CLEAR_PRICE_HISTORY:
      return {};
    default:
      return state;
  }
};
