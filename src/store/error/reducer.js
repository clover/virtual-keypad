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
      if (
        payload.code === 'Interrupted' &&
        payload.type === 'COMMUNICATION' &&
        payload.message?.includes('FORCECONNECT')
      ) {
        return {
          ...state,
          message: 'Forcefully disconnected by another connection to the same device.',
          stack: JSON.stringify(payload, null, 2),
          important: undefined,
        };
      }
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
