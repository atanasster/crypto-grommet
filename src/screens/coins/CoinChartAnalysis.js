import React from 'react';
import { Box } from 'grommet';
import PriceChart from './components/PriceChart';

export default ({ symbol, toSymbol, exchange }) => (
  <Box fill='horizontal' basis='medium' margin={{ vertical: 'medium' }}>
    <PriceChart
      symbol={symbol}
      toSymbol={toSymbol}
      exchange={exchange}
      period='day'
      points={2000}
    />
  </Box>
);
