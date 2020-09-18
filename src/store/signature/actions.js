import * as CONST from './constants';

export const clearSignature = () => ({ type: CONST.SIGNATURE_CLEAR });

export const setSignature = signature => ({
  type: CONST.SIGNATURE_SET,
  payload: signature,
});
