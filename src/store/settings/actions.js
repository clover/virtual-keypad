import * as CONST from './constants';

export const setEmployee = data => ({
  type: CONST.SETTINGS_EMPLOYEE,
  payload: data,
});

export const setPermissions = data => ({
  type: CONST.SETTINGS_PERMISSIONS,
  payload: data,
});
