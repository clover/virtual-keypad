import * as CONST from './constants';

export const clearError = () => ({ type: CONST.ERROR_CLEAR });

export const setError = ({ message, stack, important } = {}) => ({
  type: CONST.ERROR_SET,
  payload: { message, stack, important },
});
