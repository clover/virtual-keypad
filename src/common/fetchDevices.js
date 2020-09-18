import { APP_BY_NAME, REG_PRODUCTS } from './constants';
import * as api from './api';

const appsReducer = (o, a) => {
  const app = APP_BY_NAME[a.appName];
  return app ? { ...o, [app]: true } : o;
};

const createPartition = (array, size) =>
  array.reduce(
    (a, o) => {
      const last = a[a.length - 1];
      if (last.length === size) {
        a.push([o]);
      } else {
        last.push(o);
      }
      return a;
    },
    [[]]
  );

export default async ({ cloverDomain, merchantId, accessToken }) => {
  const { elements } = await api.devices({ cloverDomain, merchantId, accessToken });
  const devices = elements.filter(d => REG_PRODUCTS.test(d.productName));

  // NOTE: We need to limit simultaneous API requests.
  const partitions = createPartition(devices, 4);
  for (let i = 0; i < partitions.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    partitions[i] = await Promise.all(
      partitions[i].map(({ id: deviceId }) => api.deviceApps({ cloverDomain, merchantId, accessToken, deviceId }))
    );
  }
  const apps = partitions.flat();

  return devices.map((device, i) => ({
    ...device,
    apps: apps[i].applications.reduce(appsReducer, {}),
  }));
};
