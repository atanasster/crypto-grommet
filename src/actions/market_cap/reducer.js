import * as ActionTypes from './constants';

const initialState = {
  pagingTable: {
    loading: false,
    tickers: [],
  },
  distribution: {
    loading: false,
    tickers: [],
  },
  global: {},
};


export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_MARKET_CAP_TABLE:
      return {
        ...state,
        pagingTable: { ...state.pagingTable, loading: true },
      };
    case ActionTypes.SUCCESS_MARKET_CAP_TABLE:
      return {
        ...state,
        pagingTable: { tickers: [...action.payload], loading: false },
      };
    case ActionTypes.FAILURE_MARKET_CAP_GLOBAL:
      return {
        ...state,
        pagingTable: { tickers: [], loading: false },
      };
    case ActionTypes.REQUEST_MARKET_CAP_DUSTRIBUTION:
      return {
        ...state,
        distribution: { ...state.distribution, loading: true },
      };
    case ActionTypes.SUCCESS_MARKET_CAP_DUSTRIBUTION:
      return {
        ...state,
        distribution: { tickers: [...action.payload], loading: false },
      };
    case ActionTypes.FAILURE_MARKET_CAP_DUSTRIBUTION:
      return {
        ...state,
        distribution: { tickers: [], loading: false },
      };

    case ActionTypes.SUCCESS_MARKET_CAP_GLOBAL:
      return {
        ...state,
        global: { ...action.payload },
      };

    default:
      return state;
  }
};
