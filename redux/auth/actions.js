import * as ActionTypes from './constants';

export const signIn = ({ user, token }) => (
  {
    type: ActionTypes.AUTH_USER,
    user,
    token,
  }
);

export const setToken = token => (
  { type: ActionTypes.AUTH_SET_TOKEN, token }
);

export const signOut = () => (
  { type: ActionTypes.AUTH_ANONYMOUS }
);
