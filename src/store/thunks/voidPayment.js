import Clover from 'remote-pay-cloud';

import { TRANSACTION } from '../../common/constants';
import { setError } from '../error/actions';
import { selectConnector } from '../connection/selectors';
import { clearActions } from '../actions/actions';
import { setStatus } from '../status/actions';
import { setActiveTransaction } from '../transactions';

export default payment => async (dispatch, getState) => {
  try {
    dispatch({ type: 'voidPayment', payload: payment });

    const { id, externalPaymentId, orderId, amount, tipAmount } = payment;
    const connector = selectConnector(getState());

    dispatch(clearActions());
    dispatch(setStatus('Processing…'));
    if (!id) throw new Error('No payment was specified');

    const type = TRANSACTION.VOID;
    dispatch(setActiveTransaction({ id: externalPaymentId, type, amount, tipAmount }));

    const request = new Clover.remotepay.VoidPaymentRequest();
    request.setPaymentId(id);
    request.setOrderId(orderId);
    request.setVoidReason(Clover.order.VoidReason.USER_CANCEL);
    connector.voidPayment(request);
  } catch (e) {
    dispatch(setError(e));
    dispatch({ type: '@@connector/onDeviceReady' });
  }
};
