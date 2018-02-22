import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Box } from 'grommet';
import Page from '../../components/Page';
import { addStatus } from '../../actions/notifications/actions';
import { NavAnchor } from '../../components/utils/Links';
import Coin from '../../components/Coin';
import CoinInfo from './CoinInfo';
import CoinOrderBook from './CoinOrderBook';
import CoinChartAnalysis from './CoinChartAnalysis';
import CoinSocial from './CoinSocial';

class CoinPage extends Component {
  displayNotificatios = (props) => {
    const { coin } = props;
    if (coin && coin.symbol !== this.lastCoin) {
      const { messages = [] } = coin;
      const statusMap = {
        error: 'critical',
        warning: 'warning',
        info: 'disabled',
      };
      messages.forEach(message => (
        this.props.addStatus(message.message, statusMap[message.type])
      ));
    }
  };

  componentDidMount() {
    this.displayNotificatios(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.displayNotificatios(nextProps);
  }

  render() {
    const { symbol, toSymbol, exchange, coin } = this.props;
    return (
      <Page
        name={<Coin
          symbol={symbol}
          toSymbol={toSymbol}
          exchange={exchange}
          border={null}
          level={2}
        />}
        description={coin ? coin.description : undefined}
      >
        <Box direction='row' align='center' gap='small'>
          <NavAnchor
            path={`/coins/general/${symbol}/${toSymbol}/${exchange}`}
            label='General'
            a11yTitle={`Pricing information on ${symbol}`}
          />
          <NavAnchor
            path={`/coins/social/${symbol}/${toSymbol}/${exchange}`}
            label='Social'
            a11yTitle={`Social information on ${symbol}`}
          />
          <NavAnchor
            path={`/coins/chart/${symbol}/${toSymbol}/${exchange}`}
            label='Chart'
            a11yTitle={`Technical chart analysis on ${symbol}`}
          />
          <NavAnchor
            path={`/coins/order_book/${symbol}/${toSymbol}/${exchange}`}
            label='Order books'
            a11yTitle={`Depth of market analysis on ${symbol}`}
          />
        </Box>
        <Box align='center' fill='horizontal' margin={{ vertical: 'medium' }}>
          <Switch>
            <Route
              exact={true}
              path='/coins/social/:symbol/:toSymbol?/:exchange?'
              render={() => <CoinSocial {...{ coin, symbol, toSymbol, exchange }} />}
            />
            <Route
              exact={true}
              path='/coins/chart/:symbol/:toSymbol?/:exchange?'
              render={() => <CoinChartAnalysis {...{ coin, symbol, toSymbol, exchange }} />}
            />
            <Route
              exact={true}
              path='/coins/order_book/:symbol/:toSymbol?/:exchange?'
              render={() => <CoinOrderBook {...{ coin, symbol, toSymbol, exchange }} />}
            />
            <Route
              exact={true}
              path='/coins/general/:symbol/:toSymbol?/:exchange?'
              render={() => (<CoinInfo {...{ coin, symbol, toSymbol, exchange }} />)}
            />
          </Switch>
        </Box>
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const symbol = props.match.params.symbol;
  const toSymbol = props.match.params.toSymbol || state.settings.defaultCurrency;
  const exchange = props.match.params.exchange || state.settings.defaultExchange;
  return {
    coin: state.coins.all[symbol],
    symbol,
    toSymbol,
    exchange,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ addStatus }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoinPage));
