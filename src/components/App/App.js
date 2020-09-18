import React from 'react';
import classNames from 'classnames';

import Configuration from '../Configuration';
import Devices from '../Devices/Devices';
import Keypad from '../Keypad';
import { useError } from '../Error';
import { useTransactions } from '../Transaction';
import useMouse from './useMouse';
import usePreventDoubleTapZoom from './usePreventDoubleTapZoom';
import './styles.scss';

export default () => {
  const mouse = useMouse();
  useError(mouse);
  usePreventDoubleTapZoom();
  useTransactions(mouse);

  return (
    <div className={classNames('App container maxwidth')}>
      <Configuration />
      <Devices />
      <Keypad />
    </div>
  );
};
