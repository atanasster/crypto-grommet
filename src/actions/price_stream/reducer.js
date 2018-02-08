import * as ActionTypes from './constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.APPEND_PRICE_PAIR: {
      return {
        ...state,
        [ActionTypes.actionToKey(action)]: {
          symbol: action.symbol,
          toSymbol: action.toSymbol,
          exchange: action.exchange,
          data: state[ActionTypes.actionToKey(action)] ?
            { ...state[ActionTypes.actionToKey(action)].data, ...action.data } : action.data,
        },
      };
    }
    case ActionTypes.CLEAR_PRICE_PAIR: {
      // eslint-disable-next-line no-unused-vars
      const { [ActionTypes.actionToKey(action)]: pair, ...other } = state;
      return other;
    }
    default:
      return state;
  }
};
