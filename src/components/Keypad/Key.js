import React, { forwardRef, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import ScaleText from './ScaleText';

export default forwardRef(
  (
    { action, height, color, keyCodes, disabled, onClick, moreActions, moreText, onMoreClick, children, ...other },
    ref$
  ) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const ref = ref$ || useRef();

    const toggle = useCallback(() => setShow(cur => !cur), [setShow]);

    useEffect(() => {
      if (!disabled) {
        const keydown = event => {
          if (keyCodes.includes(event.code)) {
            event.preventDefault();
            onClick();
            return false;
          }
          return true;
        };
        document.addEventListener('keydown', keydown);
        return () => document.removeEventListener('keydown', keydown);
      }
      return undefined;
    }, [disabled, keyCodes, onClick]);

    const value = useMemo(() => {
      const key = action?.payload?.description || action?.type;
      return key ? t([`ACTION~${key}`, key]) : children;
    }, [action, children, t]);

    const title = useMemo(
      () => [t('Shortcut keys'), keyCodes.map(k => t([`KEY_CODE~${k}`, k])).join(', ')].join(': '),
      [keyCodes, t]
    );

    if (action && moreActions?.length) {
      return (
        <ButtonDropdown isOpen={show} toggle={toggle}>
          <Button
            color="dark"
            className="action rounded-left"
            onClick={onClick}
            disabled={disabled}
            title={title}
            {...other}
          >
            {value || <span>&nbsp;</span>}
          </Button>
          <DropdownToggle caret color="dark" className="action" disabled={disabled} />
          <DropdownMenu className="bg-dark" right>
            {moreActions.map((a, i) => (
              <DropdownItem key={i} className="bg-dark text-light" onClick={() => onMoreClick(a)}>
                {t([`ACTION~${a.payload?.description || a.type}`, a.payload?.description || a.type])}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
      );
    }

    if (moreActions?.length) {
      return (
        <div className="btn-group-vertical d-flex flex-column">
          <ButtonDropdown isOpen={show} toggle={toggle}>
            <DropdownToggle
              caret
              color="dark"
              outline
              size="sm"
              className="text-light text-truncate"
              disabled={disabled}
            >
              {moreText}
            </DropdownToggle>
            <DropdownMenu right className="bg-dark">
              {moreActions.map((a, i) => (
                <DropdownItem key={i} className="bg-dark text-light" onClick={() => onMoreClick(a)}>
                  {t([`ACTION~${a.payload?.description || a.type}`, a.payload?.description || a.type])}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
          <Button
            outline
            color="dark"
            className={classNames('h-100', `text-${color || 'light'}`)}
            onClick={onClick}
            disabled={disabled}
            title={title}
            {...other}
          >
            {value || <span>&nbsp;</span>}
          </Button>
        </div>
      );
    }

    return (
      <Button
        innerRef={ref}
        style={{ height }}
        outline={!action}
        color="dark"
        className={classNames(`text-${color || 'light'}`, { action })}
        disabled={disabled}
        onClick={onClick}
        title={title}
        {...other}
      >
        <ScaleText key={value} minScale={action ? 0.4 : 1} maxScale={1}>
          {value}
        </ScaleText>
      </Button>
    );
  }
);
