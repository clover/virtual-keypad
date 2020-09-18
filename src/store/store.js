import createStore from './createStore';
import { selectConfiguration } from './configuration/selectors';
import { configure } from './thunks';

const store = createStore(undefined);

const config = selectConfiguration(store.getState());
store.dispatch(configure(config));

export default store;
