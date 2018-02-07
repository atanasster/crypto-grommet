import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import api from './middleware/api';
import rootReducer from './reducers';

const middlewareBuilder = (history) => {
  const universalMiddleware = [routerMiddleware(history), thunk, api];
  const middleware = applyMiddleware(...universalMiddleware);
  let allComposeElements = [
    middleware,
  ];
  if (process.browser) {
    allComposeElements = [
      ...allComposeElements,
    ];
  }
  return allComposeElements;
};

const finalCreateStore = history => (compose(
  ...middlewareBuilder(history),
  (process.env.NODE_ENV !== 'production'
    && typeof (window) !== 'undefined'
    && window.devToolsExtension)
    ? window.devToolsExtension()
    : f => f
)(createStore));

export default function configureStore(initialState, history) {
  const store = finalCreateStore(history)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
