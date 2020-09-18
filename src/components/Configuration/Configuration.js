import React, { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { configure, selectConfiguration, selectConfigurationLoading } from '../../store';
import { selectVisible } from './selectors';
import { TextField } from '../Fields';
import { Logo } from '../SVG';

export default () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const configuration = useSelector(selectConfiguration);
  const loading = useSelector(selectConfigurationLoading);
  const visible = useSelector(selectVisible);

  const [cloverDomain, setCloverDomain] = useState(configuration.cloverDomain);
  const [merchantId, setMerchantId] = useState(configuration.merchantId);
  const [employeeId, setEmployeeId] = useState(configuration.employeeId);
  const [accessToken, setAccessToken] = useState(configuration.accessToken);
  const [raid, setRaid] = useState(configuration.raid);
  const [friendlyId, setFriendlyId] = useState(configuration.friendlyId);

  const [submitting, setSubmitting] = useState(false);

  const disabled = useMemo(() => loading || submitting, [loading, submitting]);

  const submit = useCallback(
    async event => {
      try {
        event.preventDefault();
        setSubmitting(true);
        await dispatch(configure({ cloverDomain, merchantId, employeeId, accessToken, raid, friendlyId }));
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch, cloverDomain, merchantId, employeeId, accessToken, raid, friendlyId]
  );

  const reset = useCallback(
    event => {
      event.preventDefault();
      setCloverDomain(configuration.cloverDomain);
      setMerchantId(configuration.merchantId);
      setEmployeeId(configuration.employeeId);
      setAccessToken(configuration.accessToken);
      setRaid(configuration.raid);
      setFriendlyId(configuration.friendlyId);
    },
    [configuration, setCloverDomain, setMerchantId, setEmployeeId, setAccessToken, setRaid, setFriendlyId]
  );

  if (!visible) return null;

  return (
    <form onSubmit={submit} onReset={reset}>
      <Card className="Configuration">
        <CardHeader>
          <Logo />
          <h3>{t('Virtual Keypad')}</h3>
        </CardHeader>
        {loading && (
          <CardBody>
            <p>Loading...</p>
          </CardBody>
        )}
        {!loading && (
          <>
            <CardBody>
              <TextField
                id="cloverDomain"
                type="url"
                value={cloverDomain}
                onChange={setCloverDomain}
                disabled={disabled}
                required
              />
              <TextField
                id="merchantId"
                pattern="^[a-zA-Z0-9]{13}$"
                maxLength="13"
                value={merchantId}
                onChange={setMerchantId}
                disabled={disabled}
                required
              />
              <TextField
                id="employeeId"
                pattern="^[a-zA-Z0-9]{13}$"
                maxLength="13"
                value={employeeId}
                onChange={setEmployeeId}
                disabled={disabled}
              />
              <TextField
                id="raid"
                pattern="^[a-zA-Z0-9 .]{1,255}$"
                value={raid}
                onChange={setRaid}
                disabled={disabled}
                required
              />
              <TextField
                id="accessToken"
                pattern="^[a-fA-F0-9]{8}(-?[a-fA-F0-9]{4}){3}-?[a-fA-F0-9]{12}$"
                value={accessToken}
                onChange={setAccessToken}
                disabled={disabled}
                required
              />
              <TextField id="friendlyId" value={friendlyId} onChange={setFriendlyId} disabled={disabled} />
            </CardBody>
            <CardFooter>
              <Button type="submit" color="success" disabled={disabled}>
                {t('Submit')}
              </Button>
              <Button type="reset" color="secondary" className="ml-2" disabled={disabled}>
                {t('Reset')}
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </form>
  );
};
