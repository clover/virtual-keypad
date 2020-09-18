import { clearConnector } from '../connection/actions';
import { selectConnector } from '../connection/selectors';
import { setError } from '../error/actions';
import { clearDevices } from '../devices/actions';
import { setActiveTransaction } from '../transactions/actions';

export default () => async (dispatch, getState) => {
  try {
    await dispatch({ type: 'disconnect' });

    const connector = selectConnector(getState());
    try {
      connector.showWelcomeScreen();
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (e2) {
      // Do nothing
    }

    connector.dispose();

    await dispatch(clearConnector());
    await dispatch(clearDevices());
    await dispatch(setActiveTransaction());
  } catch (e) {
    await dispatch(setError(e));
  }
};
