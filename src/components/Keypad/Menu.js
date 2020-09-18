import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { disconnect, reset, showWelcome } from '../../store';
import { CheckboxField } from '../Fields';
import { MODE } from './constants';

export default ({ mode, setMode }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow(!show), [show, setShow]);
  const onShowWelcome = useCallback(() => dispatch(showWelcome()), [dispatch]);
  const onReset = useCallback(() => dispatch(reset()), [dispatch]);
  const onDisconnect = useCallback(() => dispatch(disconnect()), [dispatch]);

  return (
    <ButtonDropdown isOpen={show} toggle={toggle}>
      <DropdownToggle size="sm" outline color="dark" className="text-light" onClick={toggle} title={t('Menu')}>
        ☰
      </DropdownToggle>
      <DropdownMenu right>
        {Object.values(MODE).map(m => (
          <DropdownItem key={m} onClick={() => setMode(m)}>
            <CheckboxField id={`mode-${m}`} label={t([`MODE~${m}`, m])} checked={m === mode} readOnly mb0 />
          </DropdownItem>
        ))}
        <DropdownItem divider />
        <DropdownItem onClick={onShowWelcome}>{t('Show Welcome')}</DropdownItem>
        <DropdownItem onClick={onReset}>{t('Reset Device')}</DropdownItem>
        <DropdownItem onClick={onDisconnect}>{t('Disconnect')}</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};
