import { PERMISSION } from './constants';
import retryFetch from './retryFetch';

export const deviceApps = ({ cloverDomain, merchantId, deviceId, accessToken }) =>
  retryFetch(new URL(`/v2/merchant/${merchantId}/device/${deviceId}/current_apps`, cloverDomain).toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  }).then(r => r.json());

export const devices = ({ cloverDomain, merchantId, accessToken }) =>
  retryFetch(new URL(`/v3/merchants/${merchantId}/devices`, cloverDomain).toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  }).then(r => r.json());

export const employee = ({ cloverDomain, merchantId, employeeId, accessToken }) =>
  retryFetch(new URL(`/v3/merchants/${merchantId}/employees/${employeeId}?expand=roles`, cloverDomain).toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  }).then(r => r.json());

export const permissionSets = ({ cloverDomain, merchantId, accessToken, filterNames = Object.values(PERMISSION) }) => {
  const url = new URL(`/v3/merchants/${merchantId}/permission_sets`, cloverDomain);
  url.searchParams.set('expand', 'roles');
  url.searchParams.set('limit', 1000);
  if (filterNames?.length) {
    url.searchParams.set('filter', `name in (${filterNames.map(n => `'${n}'`).join(',')})`);
  }
  return retryFetch(url.toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  }).then(r => r.json());
};
