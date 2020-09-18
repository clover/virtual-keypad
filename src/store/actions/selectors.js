import { createSelector } from 'reselect';

import { ACTION } from '../../common/constants';

export const selectActions = state => state.actions;

export const selectTransactionAction = createSelector(selectActions, actions =>
  actions.find(a => a.type === ACTION.TRANSACTION)
);

export const selectNonTransactionActions = createSelector(selectActions, actions => {
  const arr = actions.filter(a => a.type !== ACTION.TRANSACTION);
  if (arr.length === 2) {
    const [a, b] = arr;
    if (a.payload?.description === 'No' && b.payload?.description === 'Yes') {
      return [b, a];
    }
  }
  return arr;
});
