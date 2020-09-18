import { ACTION } from '../../common/constants';
import { selectConnector } from '../connection/selectors';
import { selectFriendlyId } from '../configuration/selectors';
import { setActions } from '../actions/actions';
import { setError } from '../error/actions';
import { setStatus } from '../status/actions';
import i18n from '../../i18n';

export default action => async (dispatch, getState) => {
  try {
    const t = await i18n;
    dispatch({ ...action, type: 'identify' });
    dispatch(setStatus('Identifying…'));
    dispatch(
      setActions([
        { type: ACTION.SHOW_WELCOME, payload: { description: 'OK' } },
        { type: ACTION.DISCONNECT, payload: { description: 'Cancel' } },
      ])
    );

    const state = getState();
    const connector = selectConnector(state);
    const friendlyId = selectFriendlyId(state);

    connector.showMessage(`${friendlyId} ${t('connected')}`);
  } catch (e) {
    dispatch(setError(e));
  }
};
