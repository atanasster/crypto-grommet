import React from 'react';
import CardScroll from '../../components/CardScroll';
import PriceCard from './components/PriceCard';
import OrderBookCard from './components/OrderBookCard';

export default ({ symbol, toSymbol, exchange }) => (
  <CardScroll>
    <PriceCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
    <PriceCard symbol={symbol} toSymbol={toSymbol} exchange='CCCAGG' />
    <OrderBookCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
  </CardScroll>
);
