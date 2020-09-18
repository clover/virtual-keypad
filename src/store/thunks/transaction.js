import Clover from 'remote-pay-cloud';
import i18n from '../../i18n';

import { clearBuffer } from '../buffer/actions';
import { selectBuffer } from '../buffer/selectors';
import { selectConnector } from '../connection/selectors';
import { selectCardEntryMethods } from '../configuration/selectors';
import { clearActions } from '../actions/actions';
import { setError } from '../error/actions';
import { setStatus } from '../status/actions';
import { TRANSACTION } from '../../common/constants';
import { updateTransaction, setActiveTransaction, selectTransactionMode } from '../transactions';

export default action => async (dispatch, getState) => {
  try {
    const t = await i18n;
    dispatch({ ...action, type: 'transaction' });

    const state = getState();
    const buffer = selectBuffer(state);
    const connector = selectConnector(state);
    const cardEntryMethods = selectCardEntryMethods(state);
    const type = selectTransactionMode(state);

    dispatch(clearActions());
    dispatch(setStatus('Processing...'));
    dispatch(clearBuffer());

    const amount = +buffer;
    if (!amount) throw new Error('Amount is required');
    if (isNaN(amount)) throw new Error('Amount is invalid');
    if (amount <= 0 || amount > 99_999_99) throw new Error('Amount is invalid');

    let id = Clover.CloverID.getNewId();
    if (type === TRANSACTION.CREDIT) {
      // HACK: externalId is ignored.  We need to use the externalReferenceId field, which is limited to 12-chars.
      id = id.slice(0, 12);
    }

    dispatch(setActiveTransaction({ id, type, amount }));

    switch (type) {
      case TRANSACTION.SALE:
        {
          const request = new Clover.remotepay.SaleRequest();
          request.setAmount(amount);
          request.setExternalId(id);
          request.setCardEntryMethods(cardEntryMethods);

          dispatch(updateTransaction({ id, type: TRANSACTION.SALE, amount }));

          connector.sale(request);
        }
        break;
      case TRANSACTION.CREDIT:
        {
          const request = new Clover.remotepay.ManualRefundRequest();
          request.setAmount(amount);
          request.setExternalId(id);
          request.setCardEntryMethods(cardEntryMethods);

          dispatch(updateTransaction({ id, type: TRANSACTION.CREDIT, amount }));

          connector.manualRefund(request);
        }
        break;
      default:
        throw new Error(`${t('ERROR~Invalid transaction type')}: ${type}`);
    }
  } catch (e) {
    dispatch(setError(e));
    dispatch({ type: '@@connector/onDeviceReady' });
  }
};
