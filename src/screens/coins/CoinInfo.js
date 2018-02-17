import React from 'react';
import { Box } from 'grommet';
import CoinPage from '../../components/pages/CoinPage';
import PriceCard from '../../components/cards/PriceCard';
import OrderBookCard from '../../components/cards/OrderBookCard';

export default () => (
  <CoinPage>
    {({ symbol, toSymbol, exchange }) => (
      <Box direction='row' pad={{ vertical: 'small' }}>
        <Box basis='1/3'>
          <PriceCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
        </Box>
        <Box basis='1/3'>
          <PriceCard symbol={symbol} toSymbol={toSymbol} exchange='CCCAGG' />
        </Box>
        <Box basis='1/3'>
          <OrderBookCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
        </Box>
      </Box>
    )
    }
  </CoinPage>
);
