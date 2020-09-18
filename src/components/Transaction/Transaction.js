import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import { useTranslation } from 'react-i18next';
import { add } from 'date-fns';

import { currency, card, TRANSACTION } from '../../common';
import {
  hideTransaction,
  selectVoidEnabled,
  setBuffer,
  setError,
  transaction as doTransaction,
  voidPayment,
} from '../../store';
import parseAmounts from './parseAmounts';

export default ({ transaction }) => {
  const { id, timestamp, type, payment } = transaction || {};
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeToast } = useToasts();
  const voidEnabled = useSelector(selectVoidEnabled);
  const now = Date.now();
  const voidableUntil = add(timestamp, { minutes: 26 });
  const [voidable, setVoidable] = useState(voidEnabled && now <= voidableUntil);

  useEffect(() => {
    if (voidable) {
      const ms = voidableUntil - now;
      if (ms > 0) {
        const to = setTimeout(() => setVoidable(false), ms);
        return () => clearTimeout(to);
      }
    }
    return undefined;
  }, [now, setVoidable, voidable, voidableUntil]);

  const { partial, remaining } = parseAmounts(transaction);

  const onRemaining = useCallback(async () => {
    try {
      await dispatch(setBuffer(remaining));
      await dispatch(doTransaction());
    } catch (e) {
      await dispatch(setError(e));
    }
  }, [remaining, dispatch]);

  const onVoid = useCallback(async () => {
    try {
      removeToast(id);
      await dispatch(hideTransaction(id));
      await dispatch(voidPayment(payment));
    } catch (e) {
      await dispatch(setError(e));
    }
  }, [dispatch, id, payment, removeToast]);

  return (
    <div className="Transaction">
      {transaction.type !== TRANSACTION.VOID && partial && (
        <div className="alert alert-warning">
          <h6 className="alert-heading">{t('Partial Payment')}</h6>
          <div>
            {t('Remaining')}: {currency(remaining)}
          </div>
        </div>
      )}
      <h5>
        {t([`TRANSACTION~${type}`, type])} {t('Details')}
      </h5>
      <Table size="sm" className="small mb-0">
        <tbody>
          <tr>
            <th>{t('Payment ID')}:</th>
            <td>{payment.id}</td>
          </tr>
          {payment.externalPaymentId && (
            <tr>
              <th>{t('External ID')}:</th>
              <td>{payment.externalPaymentId}</td>
            </tr>
          )}
          {payment.externalReferenceId && (
            <tr>
              <th>{t('External Ref')}:</th>
              <td>{payment.externalReferenceId}</td>
            </tr>
          )}
          <tr>
            <th>{t('Order ID')}:</th>
            <td>{payment.order?.id || payment.orderRef?.id}</td>
          </tr>
          {!!payment.tipAmount && (
            <tr>
              <th>{t('Total')}:</th>
              <td>{currency(payment.amount + payment.tipAmount)}</td>
            </tr>
          )}
          <tr>
            <th>{t('Amount')}:</th>
            <td>{currency(payment.amount)}</td>
          </tr>
          {!!payment.tipAmount && (
            <tr>
              <th>{t('Tip')}:</th>
              <td>{currency(payment.tipAmount)}</td>
            </tr>
          )}
          <tr>
            <th>{t('Card')}:</th>
            <td>
              <div>{t([`CARD~${payment.cardTransaction.cardType}`, payment.cardTransaction.cardType])}</div>
              <div>{card(payment.cardTransaction)}</div>
              {payment.cardTransaction.cardholderName && (
                <div>
                  {t([
                    `CARDHOLDER_NAME~${payment.cardTransaction.cardholderName}`,
                    payment.cardTransaction.cardholderName,
                  ])}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      {transaction.type === TRANSACTION.SALE && (
        <div>
          {partial && (
            <Button color="primary" size="sm" className="mr-1" onClick={onRemaining}>
              {t('Process')} {currency(remaining)}
            </Button>
          )}
          {voidable && (
            <Button color="danger" size="sm" onClick={onVoid}>
              {t('Void')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
