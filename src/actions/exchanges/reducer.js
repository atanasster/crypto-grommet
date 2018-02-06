import * as ActionTypes from './constants';

const initialState = {
  all: [],
  selected: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_EXCHANGES_SUCCESS:
      return { ...state, all: action.exchanges.data };
    default:
      return state;
  }
};
