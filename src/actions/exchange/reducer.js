import * as ActionTypes from './constants';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_EXCHANGE_INFO_SUCCESS:
      return {
        ...state,
        [action.id]: action.exchange.data,
      };
    case ActionTypes.START_GET_EXCHANGE_INFO:
      return {
        ...state,
        [action.id]: { id: action.id, name: action.id },
      };
    default:
      return state;
  }
}
