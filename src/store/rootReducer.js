import { combineReducers } from 'redux';
import actions from './actions/reducer';
import buffer from './buffer/reducer';
import configuration from './configuration/reducer';
import connection from './connection/reducer';
import devices from './devices/reducer';
import error from './error/reducer';
import settings from './settings/reducer';
import signature from './signature/reducer';
import status from './status/reducer';
import transactions from './transactions/reducer';

const rootReducer = combineReducers({
  actions,
  buffer,
  configuration,
  connection,
  devices,
  error,
  settings,
  signature,
  status,
  transactions,
});

export default rootReducer;
