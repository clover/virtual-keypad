import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { format, compareDesc } from 'date-fns';

import { selectPaymentTransactions } from '../../store';
import { currency } from '../../common';
import { useShowTransaction } from '../Transaction';

const parseAmount = ({ amount, tipAmount, payment }) =>
  currency(payment ? (payment.amount || 0) + (payment.tipAmount || 0) : (amount || 0) + (tipAmount || 0));

const parseTimestamp = ({ timestamp }) => (timestamp ? format(timestamp, 'M/d h:mm a') : '??');

export default () => {
  const { t } = useTranslation();
  const transactions = useSelector(selectPaymentTransactions);
  const showTransaction = useShowTransaction();

  const sortedTransactions = useMemo(() => transactions.sort((a, b) => compareDesc(a.timestamp, b.timestamp)), [
    transactions,
  ]);

  return (
    <div className="History">
      <Table size="sm" hover className="table-secondary" striped>
        <thead>
          <tr>
            <th>{t('Date')}</th>
            <th>{t('Type')}</th>
            <th className="text-right">{t('Amount')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => (
            <tr key={transaction.id} role="button" onClick={() => showTransaction(transaction)}>
              <td>{parseTimestamp(transaction)}</td>
              <td>{t(`TRANSACTION~${transaction.type}`)}</td>
              <td className="text-right">{parseAmount(transaction)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
