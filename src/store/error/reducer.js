import * as CONST from './constants';
import initialState from './initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONST.ERROR_CLEAR:
      return initialState;
    case CONST.ERROR_SET:
      return {
        ...state,
        message: payload.message,
        stack: payload.stack,
        important: payload.important,
      };
    case '@@connector/onDeviceError':
      return {
        ...state,
        message: `Device Error ${payload.message}`,
        stack: JSON.stringify(payload, null, 2),
        important: undefined,
      };
    case '@@connector/onManualRefundResponse':
    case '@@connector/onSaleResponse':
    case '@@connector/onVoidPaymentResponse':
      if (!payload.success) {
        return {
          ...state,
          message: payload.message,
          stack: JSON.stringify(payload, null, 2),
          important: true,
        };
      }
      return state;
    default:
      return state;
  }
};
