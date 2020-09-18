import * as CONST from './constants';
import initialState from './initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONST.DEVICES_CLEAR_LIST:
      return {
        ...state,
        list: [],
      };
    case CONST.DEVICES_CLEAR_SELECTED:
      return {
        ...state,
        selected: '',
      };
    case CONST.DEVICES_SET_SELECTED:
      return {
        ...state,
        selected: payload || '',
      };
    case CONST.DEVICES_SET_LIST:
      return {
        ...state,
        list: payload || [],
      };
    default:
      return state;
  }
};
