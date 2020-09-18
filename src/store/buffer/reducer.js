import * as CONST from './constants';
import initialState from './initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONST.BUFFER_CLEAR:
      return initialState;
    case CONST.BUFFER_APPEND:
      return (state + payload).replace(/^0+/, '').slice(0, 7);
    case CONST.BUFFER_SET:
      return payload;
    case CONST.BUFFER_UNDO:
      return state.length ? state.slice(0, state.length - 1) : '';
    default:
      return state;
  }
};
