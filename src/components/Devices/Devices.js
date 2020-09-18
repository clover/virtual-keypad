import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { selectDevices, selectDeviceId, connect, clearDevices } from '../../store';
import { selectVisible } from './selectors';
import { Logo } from '../SVG';
import Device from './Device';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);
  const deviceId = useSelector(selectDeviceId);
  const visible = useSelector(selectVisible);
  const [disabled, setDisabled] = useState();

  const select = useCallback(
    id => async event => {
      try {
        event.preventDefault();
        setDisabled(true);
        await dispatch(connect(id));
      } finally {
        setDisabled(false);
      }
    },
    [dispatch]
  );

  const cancel = () => dispatch(clearDevices());

  if (!visible) return null;

  return (
    <Card className="Devices">
      <CardHeader>
        <Logo />
        <h3>{t('Virtual Keypad')}</h3>
        <button className="close text-light" title={t('Cancel')} onClick={cancel} disabled={disabled}>
          &times;
        </button>
      </CardHeader>
      <CardBody>
        <div className="form-group">
          <label>{t('Select Device')}:</label>
          <div className="list-group">
            {devices.map(device => (
              <Device
                key={device.id}
                device={device}
                disabled={disabled}
                active={device.id === deviceId}
                onClick={select(device.id)}
              />
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
