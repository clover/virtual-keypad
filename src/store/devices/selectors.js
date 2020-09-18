import { createSelector } from 'reselect';

export const selectRawDevices = state => state.devices;

export const selectDeviceId = createSelector(selectRawDevices, ({ selected }) => selected);

export const selectDevices = createSelector(selectRawDevices, selectDeviceId, ({ list }, deviceId) =>
  [...list].sort((a, b) => (a.id === deviceId ? -1 : b.id === deviceId ? 1 : 0))
);
