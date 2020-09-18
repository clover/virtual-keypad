import Clover from 'remote-pay-cloud';

import { setError } from '../error/actions';
import { clearActions } from '../actions/actions';
import { selectConnector } from '../connection/selectors';
import { setStatus } from '../status/actions';
import { clearSignature } from '../signature/actions';

export default action => async (dispatch, getState) => {
  try {
    dispatch({ ...action, type: 'acceptSignature' });
    dispatch(setStatus('Accepting signature…'));
    dispatch(clearActions());
    dispatch(clearSignature());

    const connector = selectConnector(getState());
    const request = new Clover.remotepay.VerifySignatureRequest();
    request.setPayment(action.payload.payment);
    connector.acceptSignature(request);
  } catch (e) {
    dispatch(setError(e));
  }
};
