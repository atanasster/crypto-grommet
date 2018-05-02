import React from 'react';
import PropTypes from 'prop-types';
import CardScroll from '../CardScroll';
import PriceCard from './PriceCard';
import ICOCard from './ICOCard';
import OrderBookCard from './OrderBookCard';

const CoinDashboard = ({ symbol, toSymbol, exchange }) => (
  <CardScroll>
    <ICOCard symbol={symbol} />
    <PriceCard symbol={symbol} toSymbol={toSymbol} exchange='CCCAGG' />
    <PriceCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
    <OrderBookCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
  </CardScroll>
);


CoinDashboard.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
};

export default CoinDashboard;
