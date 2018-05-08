import React from 'react';
import { withRouter } from 'next/router';
import { compose, graphql } from 'react-apollo';
import App from '../../components/App';
import Coin from '../../components/coins/Coin';
import connect from '../../redux';
import withData from '../../apollo/withData';
import { coinInfoQuery, coinDetailsQuery } from '../../graphql/coins';
import OrderBookAnalysis from '../../components/coins/OrderBookAnalysis';
import CoinsPageMenu from '../../components/coins/CoinsPageMenu';

const CoinInfo = ({
  symbol, toSymbol, exchange, coin: { coin }, toCoin: { coin: toCoin },
}) => (
  <App
    title={`${symbol}/${toSymbol}/${exchange}`}
    visibleTitle={coin && <Coin size='large' coin={coin} toCoin={toCoin} exchange={exchange} />}
    menu={<CoinsPageMenu activeItem={1} symbol={symbol} toSymbol={toSymbol} exchange={exchange} />}
  >
    {coin && toCoin && (
      <OrderBookAnalysis
        symbol={symbol}
        toSymbol={toSymbol}
        exchange={exchange}
      />
    )}
  </App>
);

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
