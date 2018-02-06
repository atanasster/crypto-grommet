import * as ActionTypes from './constants';

const initialState = [];

export default function exchanges(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_ERROR:
      return [...state, action.error];
    case ActionTypes.REMOVE_ERROR:
      return state.filter(msg => (msg !== action.id));
    default:
      return state;
  }
}
