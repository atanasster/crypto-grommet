import React from 'react';
import { compose, graphql } from 'react-apollo';
import App from '../../components/App';
import Coin from '../../components/coins/Coin';
import connect from '../../redux';
import withData from '../../apollo/withData';
import { coinInfoQuery, coinDetailsQuery } from '../../components/graphql/coins';
import CardScroll from '../../components/CardScroll';
import ICOCard from '../../components/coins/ICOCard';
import { ConnectedPriceCard } from '../../components/coins/PriceCard';
import OrderBookCard from '../../components/coins/OrderBookCard';
import CoinsPageMenu from '../../components/coins/CoinsPageMenu';

const CoinInfo = ({
  symbol, toSymbol, exchange, coin: { coin }, toCoin: { coin: toCoin },
}) => (
  <App
    title={`${symbol}/${toSymbol}/${exchange}`}
    notifications={coin && coin.messages && coin.messages.map(
      msg => ({ message: msg.message, status: msg.type })
    )}
    description={coin && (coin.ICO && coin.ICO.status !== 'Finished' ? coin.ICO.description : coin.description)}
    visibleTitle={coin && <Coin coin={coin} toCoin={toCoin} exchange={exchange} />}
    menu={<CoinsPageMenu activeItem={0} symbol={symbol} toSymbol={toSymbol} exchange={exchange} />}
  >
    {coin && toCoin && (
      <CardScroll>
        {coin.ICO && coin.ICO.status !== 'Finished' && <ICOCard coin={coin} />}
        <ConnectedPriceCard coin={coin} toCoin={toCoin} exchange='CCCAGG' />
        <ConnectedPriceCard coin={coin} toCoin={toCoin} exchange={exchange} />
        <OrderBookCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
      </CardScroll>
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
  graphql(coinDetailsQuery, { name: 'coin', options: props => ({ variables: { symbol: props.symbol } }) }),
  graphql(coinInfoQuery, { name: 'toCoin', options: props => ({ variables: { symbol: props.toSymbol } }) }),
)(CoinInfo)));
