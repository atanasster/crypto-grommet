import React from 'react';
import { Box } from 'grommet';
import Page from './Page';
import { NavAnchor } from './Nav';

export default ({ children, symbol, toSymbol, exchange }) => (
  <Page name={<Box direction='row' align='center'>{symbol}</Box>}>
    <Box direction='row' align='center'>
      <NavAnchor path={`/coins/info/${symbol}/${toSymbol}/${exchange}`} label='Info' />
      <NavAnchor path={`/coins/order_book/${symbol}/${toSymbol}/${exchange}`} label='Order books' />
    </Box>
    <Box align='center'>
      {children}
    </Box>
  </Page>
);
