import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export default initialState => {
  const middleware = applyMiddleware(thunk);

  // eslint-disable-next-line no-underscore-dangle
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
  const enhancer = devTools ? devTools() : f => f;

  return createStore(rootReducer, initialState, compose(middleware, enhancer));
};
