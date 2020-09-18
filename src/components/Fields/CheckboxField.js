import React from 'react';
import classNames from 'classnames';

export default ({ id, label, checked, onChange, disabled, switch: isSwitch, mb0, ...other }) => {
  return (
    <div className={classNames('form-group', { 'mb-0': mb0 })}>
      <div className={classNames('custom-control', { 'custom-switch': isSwitch, 'custom-checkbox': !isSwitch })}>
        <input
          id={id}
          type="checkbox"
          className="custom-control-input"
          checked={checked}
          onChange={() => onChange(!checked)}
          disabled={disabled}
          {...other}
        />
        <label className="custom-control-label font-weight-normal" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
};
