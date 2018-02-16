import * as ActionTypes from './constants';

const initialState = {
  all: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_EXCHANGES_LIST:
      return { ...state, loading: true };
    case ActionTypes.SUCCESS_EXCHANGES_LIST:
      return { ...state,
        all: action.payload.data.reduce((obj, item) => {
          // eslint-disable-next-line no-param-reassign
          obj[item.name] = item;
          return obj;
        }, {}),
        loading: false,
      };
    case ActionTypes.FAILURE_EXCHANGES_LIST:
      return { ...state, loading: false };
    default:
      return state;
  }
};
