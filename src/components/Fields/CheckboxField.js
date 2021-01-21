import React, { useCallback, useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Markdown from 'react-markdown';
import classNames from 'classnames';

export default ({ id, label, help, checked, onChange, disabled, switch: isSwitch, mb0, ...other }) => {
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow(cur => !cur), [setShow]);

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
        <label className="custom-control-label font-weight-normal d-block" htmlFor={id}>
          {label}
          {help && (
            <>
              <Button
                type="button"
                id={`${id}-btn`}
                color="secondary"
                outline
                size="sm"
                className="float-right p-0 px-2"
                title="Help"
                onFocus={toggle}
              >
                ?
              </Button>
              <Popover trigger="focus" isOpen={show} toggle={toggle} target={`${id}-btn`}>
                <PopoverHeader>{label} Help</PopoverHeader>
                <PopoverBody>
                  <Markdown source={help} linkTarget="_blank" />
                </PopoverBody>
              </Popover>
            </>
          )}
        </label>
      </div>
    </div>
  );
};
