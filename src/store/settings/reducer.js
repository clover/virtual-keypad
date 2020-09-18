import * as CONST from './constants';
import initialState from './initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONST.SETTINGS_EMPLOYEE:
      return {
        ...state,
        employee: payload,
      };
    case CONST.SETTINGS_PERMISSIONS:
      return {
        ...state,
        permissions: payload,
      };
    default:
      return state;
  }
};
