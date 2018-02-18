import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Grommet, Box } from 'grommet';
import Content from './components/Content';
import configureStore from './store';
import requestExchanges from './actions/exchanges/actions';
import requestCoins from './actions/coins/actions';


// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__;
const history = createHistory();
const store = configureStore(preloadedState, history);


const theme = {
  global: {
    colors: {
      brand: '#336699',
    },
  },
  table: {
  },
};

export default class App extends Component {
  componentDidMount() {
    // global lists that are used throughout
    store.dispatch(requestExchanges);
    store.dispatch(requestCoins);
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Grommet theme={theme}>
            <Box style={{ minHeight: '100vh' }}>
              <Content />
            </Box>
          </Grommet>
        </Router>
      </Provider>
    );
  }
}
