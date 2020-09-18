import { createSelector } from 'reselect';

export const selectRawTransactions = state => state.transactions;

export const selectTransactions = createSelector(selectRawTransactions, ({ data }) => Object.values(data));

export const selectActiveTransaction = createSelector(selectRawTransactions, ({ active, data }) => data[active]);

export const selectActiveTransactionType = createSelector(selectActiveTransaction, active => active?.type);

export const selectActiveTransactionAmount = createSelector(
  selectActiveTransaction,
  active => (active?.amount || 0) + (active?.tipAmount || 0)
);

export const selectPaymentTransactions = createSelector(selectTransactions, transactions =>
  transactions.filter(t => t.payment)
);

export const selectVisiblePaymentTransactions = createSelector(selectPaymentTransactions, transactions =>
  transactions.filter(t => t.visible)
);

export const selectTransactionMode = createSelector(selectRawTransactions, ({ mode }) => mode);
