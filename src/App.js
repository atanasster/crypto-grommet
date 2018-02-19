import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Grommet, Box, Responsive } from 'grommet';
import Content from './components/Content';
import configureStore from './store';
import requestExchanges from './actions/exchanges/actions';
import requestCoins from './actions/coins/actions';
import { updateResponsive } from './actions/nav/actions';

// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__;
const history = createHistory();
const store = configureStore(preloadedState, history);


export default class App extends Component {
  state = {
    theme: {
      global: {
        colors: {
          brand: '#336699',
        },
      },
      table: {
      },
    },
  };

  componentDidMount() {
    // global lists that are used throughout
    store.dispatch(requestExchanges);
    store.dispatch(requestCoins);
  }

  onResponsive = (nav) => {
    const mobile = nav === 'narrow';
    store.dispatch(updateResponsive(mobile));
    const baseSpacing = 24;
    this.setState({
      theme: {
        ...this.state.theme,
        edgeSize: {
          none: '0',
          xsmall: `${baseSpacing / (mobile ? 8 : 4)}px`,
          small: `${baseSpacing / (mobile ? 6 : 2)}px`,
          medium: `${baseSpacing / (mobile ? 4 : 1)}px`,
          large: `${baseSpacing / (mobile ? 2 : 0.5)}px`,
          xlarge: `${baseSpacing / (mobile ? 1 : 0.25)}px`,
        },
      },
    });
  };

  render() {
    const { theme } = this.state;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Grommet theme={theme}>
            <Responsive onChange={this.onResponsive} >
              <Box style={{ minHeight: '100vh' }}>
                <Content />
              </Box>
            </Responsive>
          </Grommet>
        </Router>
      </Provider>
    );
  }
}
