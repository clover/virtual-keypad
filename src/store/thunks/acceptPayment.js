import { setError } from '../error/actions';
import { clearActions } from '../actions/actions';
import { selectConnector } from '../connection/selectors';
import { setStatus } from '../status/actions';

export default action => async (dispatch, getState) => {
  try {
    dispatch({ ...action, type: 'acceptPayment' });
    dispatch(setStatus('Accepting payment…'));
    dispatch(clearActions());

    const connector = selectConnector(getState());
    connector.acceptPayment(action.payload.payment);
  } catch (e) {
    dispatch(setError(e));
  }
};
