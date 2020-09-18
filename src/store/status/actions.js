import * as CONST from './constants';

export const clearStatus = () => ({ type: CONST.STATUS_CLEAR });

export const setStatus = text => ({
  type: CONST.STATUS_SET,
  payload: text,
});
