import * as ActionTypes from './constants';

const initialState = [];


export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRICE_HISTORY_SUCCESS:
      return [...state, {
        symbol: action.symbol,
        toSymbol: action.toSymbol,
        exchange: action.exchange,
        orderBook: action.data,
      }];
    case ActionTypes.CLEAR_PRICE_HISTORY:
      return [];
    default:
      return state;
  }
};
