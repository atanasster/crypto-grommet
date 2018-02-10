import * as ActionTypes from './constants';
import { SUCCESS_EXCHANGES_LIST } from '../exchanges/constants';
import allCountries from './countries';

const initialState = {
  all: [],
  selected: [],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_EXCHANGES_LIST: {
      const uniqueCountries = [...new Set(action.payload.data.reduce((arr, ex) =>
        ([...arr, ...ex.countries]), [])),
      ];
      return {
        ...state,
        all: Object.keys(allCountries).filter(c =>
          (uniqueCountries.indexOf(c)) !== -1).map(c => ({ ...allCountries[c], code: c })),
      };
    }
    case ActionTypes.ADD_SELECTED_COUNTRY: {
      const country = state.all.find(c => (c.code === action.country));
      return {
        ...state,
        selected: [...state.selected, country],
        search: null,
      };
    }
    case ActionTypes.REMOVE_SELECTED_COUNTRY:
      return {
        ...state,
        selected: state.selected.filter(c => (c.code !== action.country)),
        search: null,
      };
    case ActionTypes.CLEAR_SELECTED_COUNTRIES:
      return { ...state, selected: [] };
    default:
      return state;
  }
}
