import { ACTION } from '../../common/constants';
import {
  acceptPayment,
  acceptSignature,
  disconnect,
  identify,
  invokeInputOption,
  rejectPayment,
  rejectSignature,
  reset,
  setTransactionMode,
  showWelcome,
  transaction,
} from '../../store';

export const ACTION_CREATOR = {
  [ACTION.ACCEPT_PAYMENT]: acceptPayment,
  [ACTION.ACCEPT_SIGNATURE]: acceptSignature,
  [ACTION.DISCONNECT]: disconnect,
  [ACTION.IDENTIFY]: identify,
  [ACTION.INVOKE_INPUT_OPTION]: invokeInputOption,
  [ACTION.REJECT_PAYMENT]: rejectPayment,
  [ACTION.REJECT_SIGNATURE]: rejectSignature,
  [ACTION.RESET]: reset,
  [ACTION.SHOW_WELCOME]: showWelcome,
  [ACTION.TRANSACTION]: transaction,
  [ACTION.TRANSACTION_MODE]: ({ payload }) => setTransactionMode(payload),
};

export const MODE = {
  TRANSACTION: 'TRANSACTION',
  HISTORY: 'HISTORY',
};
