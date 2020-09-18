import React from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { hideTransaction } from '../../store';
import { TRANSACTION } from '../../common';
import parseAmounts from './parseAmounts';
import Transaction from './Transaction';

export default autoDismiss => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  return transaction => {
    const { partial } = parseAmounts(transaction);

    let appearance;
    if (transaction.type === TRANSACTION.VOID) appearance = 'info';
    else if (partial) appearance = 'warning';
    else appearance = 'success';

    addToast(<Transaction transaction={transaction} />, {
      id: transaction.id,
      appearance,
      autoDismiss: autoDismiss && !partial,
      autoDismissTimeout: 8000,
      onDismiss: () => {
        dispatch(hideTransaction(transaction.id));
      },
    });
  };
};
