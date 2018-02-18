import * as ActionTypes from './constants';
import { actionToKey } from '../api/api';

const initialState = {};


export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SUCCESS_PRICE_HISTORY:
      return {
        ...state,
        [actionToKey(action.payload)]: {
          data: action.payload.data,
        },
      };
    default:
      return state;
  }
};
