import { createSelector } from 'reselect';
import { selectConnector } from '../../store';

export const selectVisible = createSelector(selectConnector, connector => !!connector);
