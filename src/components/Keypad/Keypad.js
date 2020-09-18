import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { Logo } from '../SVG';
import { MODE } from './constants';
import { selectVisible } from './selectors';
import Screen from './Screen';
import Keys from './Keys';
import Menu from './Menu';
import History from './History';
import './styles.scss';

export default () => {
  const { t } = useTranslation();
  const visible = useSelector(selectVisible);

  const [mode, setMode] = useState(MODE.TRANSACTION);

  if (!visible) return null;

  return (
    <Card className="Keypad">
      <CardHeader>
        <Logo />
        <h3>{t('Virtual Keypad')}</h3>
        <Menu mode={mode} setMode={setMode} />
      </CardHeader>
      <CardBody>
        {mode === MODE.TRANSACTION && <Screen />}
        {mode === MODE.TRANSACTION && <Keys />}
        {mode === MODE.HISTORY && <History />}
      </CardBody>
    </Card>
  );
};
