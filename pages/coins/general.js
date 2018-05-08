import React from 'react';
import { withRouter } from 'next/router';
import { compose, graphql } from 'react-apollo';
import App from '../../components/App';
import Coin, { hasICO } from '../../components/coins/Coin';
import connect from '../../redux';
import withData from '../../apollo/withData';
import { coinInfoQuery, coinDetailsQuery } from '../../graphql/coins';
import CoinDashboard from '../../components/coins/CoinDashboard';
import CoinsPageMenu from '../../components/coins/CoinsPageMenu';

class CoinInfo extends React.Component {
  render() {
    const {
      symbol, toSymbol, exchange, coin: { coin }, toCoin: { coin: toCoin },
    } = this.props;
    const notifications = [];
    if (coin) {
      if (coin.infoMessage) {
        notifications.push({ message: coin.infoMessage, status: 'info' });
      }
      if (coin.dangerMessage) {
        notifications.push({ message: coin.dangerMessage, status: 'error' });
      }
      if (coin.warningMessage) {
        notifications.push({ message: coin.warningMessage, status: 'warning' });
      }
    }
    return (
      <App
        title={`${symbol}/${toSymbol}/${exchange}`}
        notifications={notifications}
        description={coin && (hasICO(coin) ? coin.icoDescription : coin.description)}
        visibleTitle={coin && <Coin size='large' coin={coin} toCoin={toCoin} exchange={exchange} />}
        menu={
          <CoinsPageMenu
            activeItem={0}
            symbol={symbol}
            toSymbol={toSymbol}
            exchange={exchange}
          />
        }
      >
        {coin && toCoin && (
          <CoinDashboard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
        )}
      </App>
    );
  }
}


const mapStateToProps = (state, props) => {
  const exchange = props.router.query.exchange || state.settings.defaultExchange;
  const symbol = props.router.query.symbol || 'BTC';
  const toSymbol = props.router.query.toSymbol || state.settings.defaultCurrency;
  return {
    exchange,
    symbol,
    toSymbol,
  };
};


export default withRouter(withData(connect(mapStateToProps)(compose(
  graphql(coinDetailsQuery, { name: 'coin', options: props => ({ variables: { symbol: props.symbol } }) }),
  graphql(coinInfoQuery, { name: 'toCoin', options: props => ({ variables: { symbol: props.toSymbol } }) }),
)(CoinInfo))));
