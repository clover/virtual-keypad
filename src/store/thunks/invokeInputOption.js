import Clover from 'remote-pay-cloud';

import { setError } from '../error/actions';
import { selectConnector } from '../connection/selectors';

export default action => async (dispatch, getState) => {
  try {
    dispatch({ ...action, type: 'invokeInputOption' });

    const connector = selectConnector(getState());
    const request = new Clover.remotepay.InputOption();
    request.setDescription(action.payload.description);
    request.setKeyPress(action.payload.keyPress);
    connector.invokeInputOption(request);
  } catch (e) {
    dispatch(setError(e));
  }
};
