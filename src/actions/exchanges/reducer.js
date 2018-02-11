import * as ActionTypes from './constants';

const initialState = {
  all: {},
  selected: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SUCCESS_EXCHANGES_LIST:
      return { ...state,
        all: action.payload.data.reduce((obj, item) => {
          // eslint-disable-next-line no-param-reassign
          obj[item.name] = item;
          return obj;
        }, {}) };
    default:
      return state;
  }
};
