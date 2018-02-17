import React from 'react';
import CoinPage from '../../components/pages/CoinPage';
import OrderBookAnalysis from './OrderBookAnalysis';

export default () => (
  <CoinPage>
    {coinProps => (
      <OrderBookAnalysis {...coinProps} />
    )}
  </CoinPage>
);

