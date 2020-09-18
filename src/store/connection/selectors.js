import { createSelector } from 'reselect';

export const selectConnection = state => state.connection;

export const selectConnector = createSelector(selectConnection, ({ connector }) => connector);

export const selectConnected = createSelector(selectConnection, ({ connected }) => connected);
