import * as ActionTypes from './constants';

// noinspection JSAnnotator
const initialState = {
  responsive: false,
  active: false,
  manual_active: false,
  items: [
    { route: 'equities_home', label: 'equities', a11yTitle: 'Home page for equities' },
    { route: 'coins_home', label: 'coins', a11yTitle: 'Home page for crypto coins' },
    { route: 'exchanges', label: 'exchanges', a11yTitle: 'List of exchanges' },
    { route: 'coins_icos', label: 'ICO', a11yTitle: 'List of active and upcoming initial coin offerings' },
    // eslint-disable-next-line max-len
    // { route: 'deep_play', label: 'play', a11yTitle: 'Play woth tensorflow deep learning models' },
  ],
  user_items: [
    { route: 'profile', label: 'profile', a11yTitle: 'View your user profile' },
  ],
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_RESPONSIVE:
      return {
        ...state,
        responsive: action.responsive,
        active: action.responsive ? state.manual_active : false,
      };
    case ActionTypes.NAV_ACTIVE:
      return {
        ...state,
        manual_active: action.active,
        active: action.active,
      };
    default:
      return state;
  }
}
