import * as ActionTypes from './constants';

const initialState = [];


export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRICE_HISTORY_SUCCESS: {
      const idx = state.findIndex(item => (
        item.exchange === action.exchange &&
        item.symbol === action.symbol &&
      item.toSymbol === action.toSymbol));
      const arr = [...state];
      if (idx !== -1) {
        arr.splice(idx, 1);
      }
      arr.push({
        symbol: action.symbol,
        toSymbol: action.toSymbol,
        exchange: action.exchange,
        orderBook: action.data,
      });
      return arr;
    }
    case ActionTypes.CLEAR_PRICE_HISTORY:
      return [];
    default:
      return state;
  }
};
