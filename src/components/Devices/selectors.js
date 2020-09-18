import { createSelector } from 'reselect';

import { selectConnector, selectDevices } from '../../store';

export const selectVisible = createSelector(
  selectConnector,
  selectDevices,
  (connector, devices) => !connector && !!devices.length
);
