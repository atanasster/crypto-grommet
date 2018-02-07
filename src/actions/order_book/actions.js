import * as ActionTypes from './constants';


export const appendOrderBook = (symbol, toSymbol, exchange, data) => ({
  type: ActionTypes.APPEND_ORDER_BOOK,
  exchange,
  symbol,
  toSymbol,
  data,
});

export const clearOrderBook = () => ({ type: ActionTypes.CLEAR_ORDER_BOOK });


export function requestOrderBook(from, to) {
  return (dispatch, getState) => {
    const { socket } = getState().api;
    socket.on('order_book_data', ({
      exchange, symbol, toSymbol, data,
    }) => {
      dispatch(appendOrderBook(symbol, toSymbol, exchange, data));
    });
    dispatch(clearOrderBook());
    socket.emit('order_book', { symbol: from, toSymbol: to });
  };
}
