import * as CONST from './constants';

export const setConfiguration = ({ cloverDomain, merchantId, employeeId, raid, accessToken, friendlyId }) => ({
  type: CONST.CONFIGURATION_SET,
  payload: { cloverDomain, merchantId, employeeId, raid, accessToken, friendlyId },
});

export const setConfigurationLoading = () => ({ type: CONST.CONFIGURATION_LOADING });

export const setConfigurationNotLoading = () => ({ type: CONST.CONFIGURATION_NOT_LOADING });
