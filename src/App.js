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
    const baseSpacing = mobile ? 16 : 24;
    this.setState({
      theme: {
        ...this.state.theme,
        global: {
          ...this.state.theme.global,
          edgeSize: {
            none: '0',
            xsmall: `${baseSpacing / 4}px`,
            small: `${baseSpacing / 2}px`,
            medium: `${baseSpacing}px`,
            large: `${baseSpacing * 2}px`,
            xlarge: `${baseSpacing * 4}px`,
          },
        },
        heading: {
          ...this.state.theme.heading,
          level: {
            1: {
              medium: { size: `${baseSpacing * 2}px`, height: 1.125, maxWidth: `${baseSpacing * 48}px` },
              small: { size: `${baseSpacing}px`, height: 1.333, maxWidth: `${baseSpacing * 24}px` },
              large: { size: `${baseSpacing * 1.5}px`, height: 1.125, maxWidth: `${baseSpacing * 96}px` },
            },
            2: {
              medium: { size: `${baseSpacing * 1.5}px`, height: 1.23, maxWidth: `${baseSpacing * 36}px` },
              small: { size: `${baseSpacing * 0.8}px`, height: 1.333, maxWidth: `${baseSpacing * 18}px` },
              large: { size: `${baseSpacing * 2}px`, height: 1.125, maxWidth: `${baseSpacing * 48}px` },
            },
            3: {
              medium: { size: `${baseSpacing}px`, height: 1.333, maxWidth: `${baseSpacing * 24}px` },
              small: { size: `${baseSpacing * 0.8}px`, height: 1.333, maxWidth: `${baseSpacing * 18}px` },
              large: { size: `${baseSpacing * 1.5}px`, height: 1.23, maxWidth: `${baseSpacing * 36}px` },
            },
            4: {
              medium: { size: `${baseSpacing * 0.8}px`, height: 1.333, maxWidth: `${baseSpacing * 18}px` },
              small: { size: `${baseSpacing * 0.6}px`, height: 1.375, maxWidth: `${baseSpacing * 16}px` },
              large: { size: `${baseSpacing}px`, height: 1.333, maxWidth: `${baseSpacing * 24}px` },
            },
          },
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
