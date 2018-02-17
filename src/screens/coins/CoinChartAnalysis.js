import React from 'react';
import { Box } from 'grommet';
import CoinPage from '../../components/pages/CoinPage';
import PriceChart from '../../components/PriceChart';


export default () => (
  <CoinPage>
    {({ symbol, toSymbol, exchange }) => (
      <Box fill='horizontal' basis='medium' margin={{ vertical: 'medium' }}>
        <PriceChart
          symbol={symbol}
          toSymbol={toSymbol}
          exchange={exchange}
          period='day'
          points={2000}
        />
      </Box>
    )}
  </CoinPage>
);
