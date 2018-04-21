import React from 'react';
import { compose, graphql } from 'react-apollo';
import App from '../../components/App';
import Coin from '../../components/coins/Coin';
import connect from '../../redux';
import withData from '../../apollo/withData';
import { coinInfoQuery } from '../../components/graphql/coins';
import TechnicalPriceChart from '../../components/coins/TechnicalPriceChart';
import CoinsPageMenu from '../../components/coins/CoinsPageMenu';

const CoinCharts = ({
  symbol, toSymbol, exchange, coin: { coin }, toCoin: { coin: toCoin },
}) => (
  <App
    title={`${symbol}/${toSymbol}/${exchange}`}
    visibleTitle={coin && <Coin coin={coin} toCoin={toCoin} exchange={exchange} />}
    menu={<CoinsPageMenu activeItem={2} symbol={symbol} toSymbol={toSymbol} exchange={exchange} />}
  >
    {coin && toCoin && (
      <TechnicalPriceChart
        symbol={symbol}
        toSymbol={toSymbol}
        exchange={exchange}
        period='day'
        points={1000}
      />
    )}
  </App>
);

const mapStateToProps = (state, props) => {
  const exchange = props.url.query.exchange || state.settings.defaultExchange;
  const symbol = props.url.query.symbol || 'BTC';
  const toSymbol = props.url.query.toSymbol || state.settings.defaultCurrency;
  return {
    exchange,
    symbol,
    toSymbol,
  };
};


export default withData(connect(mapStateToProps)(compose(
  graphql(coinInfoQuery, { name: 'coin', options: props => ({ variables: { symbol: props.symbol } }) }),
  graphql(coinInfoQuery, { name: 'toCoin', options: props => ({ variables: { symbol: props.toSymbol } }) }),
)(CoinCharts)));
