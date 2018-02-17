import * as ActionTypes from './constants';

// eslint-disable-next-line import/prefer-default-export
export const updateResponsive = responsive => (
  { type: ActionTypes.UPDATE_RESPONSIVE, responsive }
);
