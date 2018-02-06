import * as ActionTypes from './constants';

let errorId = 0;

export const addError = (error) => {
  errorId += 1;
  return {
    type: ActionTypes.ADD_ERROR,
    error: error || 'There was an error processing your request.',
    id: (errorId),
  };
};


export const removeError = id => ({
  type: ActionTypes.REMOVE_ERROR,
  id,
});
