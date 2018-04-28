import * as ActionTypes from './constants';
import { removeItem, setItem, getItem } from '../storage';

export const saveToken = async (token) => {
  await setItem('token', token);
};

export const removeToken = async () => {
  await removeItem('token');
};

const initialState = {
  user: undefined,
  token: undefined,
};

if (process.browser) {
  getItem('token').then((token) => { initialState.token = token; });
}
export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER: {
      const newState = {
        ...state,
        user: action.user,
      };
      if (action.token) {
        saveToken(action.token);
        newState.token = action.token;
      }
      return newState;
    }
    case ActionTypes.AUTH_ANONYMOUS: {
      removeToken();
      return {
        ...state, user: undefined, token: undefined,
      };
    }
    case ActionTypes.AUTH_SET_TOKEN: {
      saveToken(action.token);
      return { ...state, token: action.token };
    }
    default:
      return state;
  }
};
