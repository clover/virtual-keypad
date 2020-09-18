import { setError } from '../error';
import { ACTION } from '../../common/constants';
import { setActions } from '../actions/actions';
import { selectConnector } from '../connection/selectors';
import { setStatus } from '../status/actions';

export default action => async (dispatch, getState) => {
  try {
    dispatch({ ...action, type: 'showWelcome' });
    dispatch(setStatus('Ready'));
    dispatch(setActions([{ type: ACTION.IDENTIFY }, { type: ACTION.TRANSACTION }]));

    const connector = selectConnector(getState());
    connector.showWelcomeScreen();
  } catch (e) {
    dispatch(setError(e));
  }
};
