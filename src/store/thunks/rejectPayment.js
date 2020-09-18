import { setError } from '../error/actions';
import { clearActions } from '../actions/actions';
import { selectConnector } from '../connection/selectors';
import { setStatus } from '../status/actions';

export default action => async (dispatch, getState) => {
  try {
    dispatch({ ...action, type: 'rejectPayment' });
    dispatch(setStatus('Rejecting payment…'));
    dispatch(clearActions());

    const connector = selectConnector(getState());
    connector.rejectPayment(action.payload.payment, action.payload.challenges[0]);
  } catch (e) {
    dispatch(setError(e));
  }
};
