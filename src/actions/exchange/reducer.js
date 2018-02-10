import * as ActionTypes from './constants';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_EXHANGE_INFO:
      return {
        ...state,
        [action.payload.data.name]: action.payload.data,
      };
    case ActionTypes.REQUEST_EXHANGE_INFO:
      return {
        ...state,
        [action.name]: { id: action.id, name: action.id },
      };
    default:
      return state;
  }
}
