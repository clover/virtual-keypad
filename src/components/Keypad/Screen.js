import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { currency } from '../../common';
import { selectStatus, selectBuffer, selectActiveTransactionType, selectActiveTransactionAmount } from '../../store';
import Signature from './Signature';

export default () => {
  const { t } = useTranslation();
  const status = useSelector(selectStatus);
  const buffer = useSelector(selectBuffer);
  const tranType = useSelector(selectActiveTransactionType);
  const tranAmount = useSelector(selectActiveTransactionAmount);

  return (
    <div className="Screen alert alert-secondary">
      {!!tranAmount && (
        <div className="Transaction d-flex justify-content-between bg-white rounded-top border-bottom border-secondary">
          <div className="font-italic">{t([`TRANSACTION~${tranType}`, tranType])}</div>
          <div className="font-weight-bold">{currency(tranAmount)}</div>
        </div>
      )}
      {!buffer && <div>{status}</div>}
      <Signature />
      {buffer && <div className="text-muted">{buffer}</div>}
      {buffer && <h3 className="text-right">{currency(buffer)}</h3>}
    </div>
  );
};
