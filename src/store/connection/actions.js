import * as CONST from './constants';

export const clearConnector = () => ({ type: CONST.CONNECTION_CLEAR });

export const setConnector = connector => ({
  type: CONST.CONNECTION_SET,
  payload: connector,
});
