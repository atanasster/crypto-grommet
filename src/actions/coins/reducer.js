import * as ActionTypes from './constants';

const initialState = {
  all: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SUCCESS_COINS_LIST:
      return { ...state,
        all: action.payload.data.reduce((obj, item) => {
          // eslint-disable-next-line no-param-reassign
          obj[item.symbol] = item;
          return obj;
        }, {}) };
    default:
      return state;
  }
};
