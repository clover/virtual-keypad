import * as CONST from './constants';

export const clearDeviceId = () => ({ type: CONST.DEVICES_CLEAR_SELECTED });

export const clearDevices = () => ({ type: CONST.DEVICES_CLEAR_LIST });

export const setDeviceId = deviceId => ({
  type: CONST.DEVICES_SET_SELECTED,
  payload: deviceId,
});

export const setDevices = devices => ({
  type: CONST.DEVICES_SET_LIST,
  payload: devices,
});
