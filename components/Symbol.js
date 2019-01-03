import React from 'react';
import { CoinGQL } from './coins/Coin';
import { EquityGQL } from './equities/Equity';

const Symbol = ({
  symbol, type, display = ['symbol'], disableLink = true,
}) => {
  switch (type) {
    case 'coin':
      return <CoinGQL symbol={symbol} display={display} disableLink={disableLink} />;
    case 'equity':
      return <EquityGQL symbol={symbol} display={display} disableLink={disableLink} />;
    default:
      return null;
  }
};

export default Symbol;
