import React, { useState, useMemo } from 'react';
import { Tooltip } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { APP } from '../../common/constants';

export default ({ device, active, disabled, onClick }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const id = useMemo(() => `device-${device.id}`, [device.id]);

  const toggle = event => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setShow(!show);
  };

  const cloud = device.apps[APP.CLOUD_PAY_DISPLAY];
  const cloudStatus = t(`cloudPayDisplay~${cloud ? '' : 'un'}installed`);

  return (
    <button
      key={device.id}
      type="button"
      className={classNames(
        'list-group-item d-flex justify-content-between align-items-center list-group-item-action p-1',
        {
          disabled,
          'list-group-item-primary': !disabled && active,
        }
      )}
      onClick={onClick}
    >
      <div className="p-1">
        {device.name && <div className="font-weight-bold">{device.name}</div>}
        {device.productName} {device.serial}
      </div>
      <span
        id={id}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={toggle}
        className={classNames('badge p-1', {
          'badge-secondary': disabled,
          'badge-success': !disabled && cloud,
          'badge-warning': !disabled && !cloud,
        })}
        role="img"
        aria-label={cloudStatus}
      >
        ☁️
      </span>
      <Tooltip isOpen={show} target={id} toggle={toggle} placement="left">
        <span className="small">{cloudStatus}</span>
      </Tooltip>
    </button>
  );
};
