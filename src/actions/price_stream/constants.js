export const APPEND_PRICE_PAIR = 'APPEND_PRICE_PAIR';
export const CLEAR_PRICE_PAIR = 'CLEAR_PRICE_PAIR';
export const actionToKey = action => (`${action.exchange}_${action.symbol}_${action.toSymbol}`);
