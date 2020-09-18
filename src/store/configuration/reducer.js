import * as CONST from './constants';
import initialState from './initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONST.CONFIGURATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CONST.CONFIGURATION_NOT_LOADING:
      return {
        ...state,
        loading: undefined,
      };
    case CONST.CONFIGURATION_SET:
      return {
        ...state,
        cloverDomain: payload.cloverDomain || '',
        merchantId: payload.merchantId || '',
        employeeId: payload.employeeId || '',
        raid: payload.raid || '',
        accessToken: payload.accessToken || '',
        friendlyId: payload.friendlyId || '',
      };
    default:
      return state;
  }
};
