import * as ActionTypes from './constants';
import { actionToKey } from '../price_stream/constants';

const initialState = {
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SUCCESS_ORDER_BOOK:
      return {
        ...state,
        data: { ...state.data,
          [actionToKey(action.payload)]: {
            realToSymbol: action.payload.realToSymbol,
            data: action.payload.data,
          },
        },
      };
    default:
      return state;
  }
};
