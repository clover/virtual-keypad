import React, { useMemo, useState, useCallback } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';

export default ({
  id,
  type = 'text',
  autoCorrect = 'off',
  autoComplete = 'off',
  autoCapitalize = 'off',
  spellCheck = 'false',
  value,
  disabled,
  onChange,
  ...other
}) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow(cur => !cur), [setShow]);

  const label = useMemo(() => t(`${id}~label`), [id, t]);
  const title = useMemo(() => t(`${id}~title`, ''), [id, t]);
  const help = useMemo(() => t(`${id}~help`, ''), [id, t]);

  return (
    <div className="form-group">
      <label htmlFor={id} className="d-block">
        {label}:
        {help && (
          <>
            <Button
              id={`${id}-btn`}
              color="secondary"
              outline
              size="sm"
              className="float-right p-0 px-2"
              title="Help"
              onClick={toggle}
            >
              ?
            </Button>
            <Popover isOpen={show} toggle={toggle} target={`${id}-btn`}>
              <PopoverHeader>{label} Help</PopoverHeader>
              <PopoverBody>
                <Markdown source={help} linkTarget="_blank" />
              </PopoverBody>
            </Popover>
          </>
        )}
      </label>
      <input
        id={id}
        type={type}
        className="form-control"
        title={title}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        spellCheck={spellCheck}
        value={value}
        onChange={event => onChange(event.target.value)}
        disabled={disabled}
        {...other}
      />
    </div>
  );
};
