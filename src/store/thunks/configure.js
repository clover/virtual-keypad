import { APP } from '../../common/constants';
import persist from '../../common/persist';
import fetchDevices from '../../common/fetchDevices';
import fetchSettings from '../../common/fetchSettings';
import { setConfiguration, setConfigurationLoading, setConfigurationNotLoading } from '../configuration/actions';
import { setDevices } from '../devices/actions';
import { clearError, setError } from '../error/actions';
import { setEmployee, setPermissions } from '../settings/actions';

export default ({ cloverDomain, merchantId, employeeId, raid, accessToken, friendlyId }) => async (
  dispatch,
  getState
) => {
  try {
    await dispatch({
      type: 'configure',
      payload: { cloverDomain, merchantId, employeeId, raid, accessToken, friendlyId },
    });
    await dispatch(clearError());
    await dispatch(setConfigurationLoading());

    await dispatch(setConfiguration({ cloverDomain, merchantId, employeeId, raid, accessToken, friendlyId }));
    persist(getState());

    const devices = await fetchDevices({ cloverDomain, merchantId, raid, employeeId, accessToken });
    await dispatch(setDevices(devices));

    if (!devices.length) {
      throw new Error('Merchant has no devices');
    }

    if (!devices.some(a => a.apps[APP.CLOUD_PAY_DISPLAY])) {
      throw new Error('Merchant has no devices with Cloud Pay Display installed');
    }

    const { employee, permissions } = await fetchSettings({ cloverDomain, merchantId, employeeId, raid, accessToken });
    await dispatch(setEmployee(employee));
    await dispatch(setPermissions(permissions));
  } catch (e) {
    await dispatch(setError(e));
  } finally {
    await dispatch(setConfigurationNotLoading());
  }
};
