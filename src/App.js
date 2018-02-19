import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Box } from 'grommet';
import Content from './components/Content';
import configureStore from './store';
import requestExchanges from './actions/exchanges/actions';
import requestCoins from './actions/coins/actions';
import { updateResponsive } from './actions/nav/actions';
import GrommetResponsive from './GrommetResponsive';
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
};

export default class App extends Component {
  componentDidMount() {
    // global lists that are used throughout
    store.dispatch(requestExchanges);
    store.dispatch(requestCoins);
  }

  onResponsive = (mobile) => {
    store.dispatch(updateResponsive(mobile));
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <GrommetResponsive onResponsive={this.onResponsive} theme={theme}>
            <Box style={{ minHeight: '100vh' }}>
              <Content />
            </Box>
          </GrommetResponsive>
        </Router>
      </Provider>
    );
  }
}
