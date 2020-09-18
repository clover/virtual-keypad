import * as CONST from './constants';

export const appendAction = action => ({
  type: CONST.ACTIONS_APPEND,
  payload: action,
});

export const clearActions = () => ({ type: CONST.ACTIONS_CLEAR });

export const setActions = actions => ({
  type: CONST.ACTIONS_SET,
  payload: actions,
});
