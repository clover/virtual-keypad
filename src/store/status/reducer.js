import * as CONST from './constants';
import initialState from './initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CONST.STATUS_CLEAR:
      return '';
    case CONST.STATUS_SET:
      return payload || '';
    case '@@connector/onDeviceReady':
      return 'Ready';
    case '@@connector/onResetDeviceResponse':
      return 'Ready';
    case '@@connector/onDeviceActivityStart':
      return payload.message;
    case '@@connector/onSaleResponse':
    case '@@connector/onVoidPaymentResponse':
    case '@@connector/onManualRefundResponse':
      return 'Ready';
    case '@@connector/onConfirmPaymentRequest':
      return payload.challenges[0].message;
    case '@@connector/onVerifySignatureRequest':
      return 'Verify Signature';
    default:
      return state;
  }
};
