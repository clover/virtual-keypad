import * as api from './api';

export default async ({ cloverDomain, merchantId, accessToken, employeeId }) => {
  const [employee, permissions] = await Promise.all([
    api.employee({ cloverDomain, merchantId, employeeId, accessToken }).catch(() => null),
    api.permissionSets({ cloverDomain, merchantId, accessToken }).catch(() => null),
  ]);
  return { employee, permissions };
};
