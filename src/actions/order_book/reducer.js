import * as ActionTypes from './constants';

const initialState = [];


export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.APPEND_ORDER_BOOK: {
      const idx = state.findIndex(item => (item.exchange === action.exchange));
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
    case ActionTypes.CLEAR_ORDER_BOOK:
      return [];
    default:
      return state;
  }
};
