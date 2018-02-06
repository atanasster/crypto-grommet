import * as ActionTypes from './constants';

const initialState = {
  all: [],
  selected: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_COINS_SUCCESS:
      return { ...state, all: action.coins };
    default:
      return state;
  }
};
