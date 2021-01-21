import * as Storage from './Storage';
import initialDevices from '../store/devices/initialState';

export default ({ configuration, devices }) =>
  Storage.set({
    configuration: {
      ...configuration,
      forceConnect: undefined,
      loading: undefined,
    },
    devices: {
      ...initialDevices,
      selected: devices.selected,
    },
  });
