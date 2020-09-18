import Clover from 'remote-pay-cloud';
import { createSelector } from 'reselect';

import { DOMAIN } from '../../common';

export const selectConfiguration = state => state.configuration;

export const selectFriendlyId = createSelector(selectConfiguration, ({ friendlyId }) => friendlyId || 'Virtual Keypad');

export const selectProduction = createSelector(selectConfiguration, ({ cloverDomain }) => cloverDomain === DOMAIN);

export const selectCardEntryMethods = createSelector(selectProduction, production =>
  production
    ? Clover.CardEntryMethods.DEFAULT
    : // eslint-disable-next-line no-bitwise
      Clover.CardEntryMethods.DEFAULT | Clover.CardEntryMethods.CARD_ENTRY_METHOD_MANUAL
);

export const selectConfigurationLoading = createSelector(selectConfiguration, ({ loading }) => loading || false);
