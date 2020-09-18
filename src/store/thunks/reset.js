import { selectConnector } from '../connection/selectors';
import { clearActions } from '../actions/actions';
import { setError } from '../error/actions';
import { setStatus } from '../status/actions';

export default action => async (dispatch, getState) => {
  try {
    dispatch({ ...action, type: 'reset' });
    dispatch(setStatus('Resetting…'));
    dispatch(clearActions());

    const connector = selectConnector(getState());
    connector.resetDevice();
  } catch (e) {
    dispatch(setError(e));
  }
};
