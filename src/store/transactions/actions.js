import * as CONST from './constants';

export const setActiveTransaction = ({ id, type, amount, tipAmount } = {}) => ({
  type: CONST.TRANSACTIONS_ACTIVE,
  payload: { id, type, amount, tipAmount },
});

export const removeTransaction = id => ({
  type: CONST.TRANSACTIONS_REMOVE,
  payload: id,
});

export const showTransaction = id => ({
  type: CONST.TRANSACTIONS_SHOW,
  payload: id,
});

export const hideTransaction = id => ({
  type: CONST.TRANSACTIONS_HIDE,
  payload: id,
});

export const updateTransaction = ({ id, type, amount, tipAmount, payment }) => ({
  type: CONST.TRANSACTIONS_UPDATE,
  payload: { id, type, amount, tipAmount, payment },
});

export const setTransactionMode = ({ mode }) => ({
  type: CONST.TRANSACTIONS_MODE,
  payload: mode,
});
