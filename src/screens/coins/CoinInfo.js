import React from 'react';
import CardScroll from '../../components/CardScroll';
import PriceCard from '../../components/cards/PriceCard';
import OrderBookCard from '../../components/cards/OrderBookCard';

export default ({ symbol, toSymbol, exchange }) => (
  <CardScroll>
    <PriceCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
    <PriceCard symbol={symbol} toSymbol={toSymbol} exchange='CCCAGG' />
    <OrderBookCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
  </CardScroll>
);
