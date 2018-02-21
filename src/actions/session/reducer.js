import * as ActionTypes from './constants';

const initialState = {
  loading: false,
  user: null,
  error: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_LOGIN:
      return { ...state, loading: true };
    case ActionTypes.SUCCESS_LOGIN:
      console.log(action);
      return { ...state, user: action.payload.user, loading: false, error: undefined };
    case ActionTypes.FAILURE_LOGIN:
      console.log(action);
      return { ...state, user: null, loading: false, error: action.payload.response.message };
    default:
      return state;
  }
};
