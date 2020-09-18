import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export default ({ error }) => {
  const { message, stack } = error;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const expand = () => {
    document.querySelector('.react-toast-notifications__container').classList.add('expanded');
    setExpanded(true);
  };

  useEffect(() => {
    return () => {
      const remaining = document.querySelectorAll('.Error.expanded').length - (expanded ? 1 : 0);
      if (!remaining) {
        document.querySelector('.react-toast-notifications__container').classList.remove('expanded');
      }
    };
  }, [expanded]);

  return (
    <div className={classNames('Error', { expanded })}>
      <h5>{t([`ERROR~${message}`, message])}</h5>
      {!!stack && !expanded && (
        <Button color="link" size="small" onClick={expand}>
          {t('Show details')}
        </Button>
      )}
      {!!stack && expanded && (
        <pre className="mb-0">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
};
