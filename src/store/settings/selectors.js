import { createSelector } from 'reselect';
import { PERMISSION } from '../../common';

export const selectRawSettings = state => state.settings;

export const selectEmployee = createSelector(selectRawSettings, ({ employee }) => employee);

export const selectEmployeeRoles = createSelector(selectEmployee, employee => employee?.roles?.elements);

export const selectPermissions = createSelector(selectRawSettings, ({ permissions }) => permissions?.elements);

export const selectCreditEnabled = createSelector(
  selectEmployeeRoles,
  selectPermissions,
  (employeeRoles, permissions) => {
    if (employeeRoles && permissions) {
      const employeeRoleIds = employeeRoles.map(r => r.id);
      const permissionRoleIds = new Set(
        permissions
          .filter(p => p.name === PERMISSION.PERFORM_MANUAL_REFUND)
          .map(p => p.roles?.elements.map(r => r.id))
          .flat()
      );
      return employeeRoleIds.some(id => permissionRoleIds.has(id));
    }
    return false;
  }
);

export const selectVoidEnabled = createSelector(
  selectEmployeeRoles,
  selectPermissions,
  (employeeRoles, permissions) => {
    if (employeeRoles && permissions) {
      const employeeRoleIds = employeeRoles.map(r => r.id);
      const permissionRoleIds = new Set(
        permissions
          .filter(p => p.name === PERMISSION.VOID_PAYMENTS)
          .map(p => p.roles?.elements.map(r => r.id))
          .flat()
      );
      return employeeRoleIds.some(id => permissionRoleIds.has(id));
    }
    return false;
  }
);
