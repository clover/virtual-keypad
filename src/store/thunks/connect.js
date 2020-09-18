import Clover from 'remote-pay-cloud';

import { APP } from '../../common/constants';
import persist from '../../common/persist';
import { selectConfiguration } from '../configuration/selectors';
import { selectDevices } from '../devices/selectors';
import { setConnector } from '../connection/actions';
import { setDeviceId } from '../devices/actions';
import { setError } from '../error/actions';
import { setStatus } from '../status/actions';

export default deviceId => async (dispatch, getState) => {
  try {
    await dispatch({ type: 'connect', payload: deviceId });
    await dispatch(setDeviceId(deviceId));

    const state = getState();
    persist(state);

    const { cloverDomain, merchantId, raid, accessToken, friendlyId } = selectConfiguration(state);
    const device = selectDevices(state).find(d => d.id === deviceId);

    if (!device) throw new Error(`Device not found`);
    if (!device.apps[APP.CLOUD_PAY_DISPLAY]) throw new Error('Device does not have Cloud Pay Display installed');

    const factory = Clover.CloverConnectorFactoryBuilder.createICloverConnectorFactory({
      [Clover.CloverConnectorFactoryBuilder.FACTORY_VERSION]: Clover.CloverConnectorFactoryBuilder.VERSION_12,
    });

    const connector = factory.createICloverConnector(
      new Clover.WebSocketCloudCloverDeviceConfigurationBuilder(raid, deviceId, merchantId, accessToken)
        .setCloverServer(cloverDomain)
        .setFriendlyId(friendlyId)
        .build()
    );

    class Listener extends Clover.remotepay.ICloverConnectorListener {
      constructor() {
        super();
        Object.keys(Object.getPrototypeOf(Object.getPrototypeOf(this))).forEach(type => {
          this[type] = payload => dispatch({ type: `@@connector/${type}`, payload });
        });
      }
    }
    const listener = new Listener();
    connector.addCloverConnectorListener(listener);

    dispatch(setConnector(connector));
    dispatch(setStatus('Connecting…'));

    connector.initializeConnection();
  } catch (e) {
    dispatch(setError(e));
  }
};
