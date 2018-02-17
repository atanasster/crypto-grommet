import React from 'react';
import CardScroll from '../../components/CardScroll';
import CoinPage from '../../components/pages/CoinPage';
import PriceCard from '../../components/cards/PriceCard';
import OrderBookCard from '../../components/cards/OrderBookCard';

export default () => (
  <CoinPage>
    {({ symbol, toSymbol, exchange }) => (
      <CardScroll>
        <PriceCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
        <PriceCard symbol={symbol} toSymbol={toSymbol} exchange='CCCAGG' />
        <OrderBookCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
      </CardScroll>
    )
    }
  </CoinPage>
);
