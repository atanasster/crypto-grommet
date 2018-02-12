import React from 'react';
import { Box } from 'grommet';
import Page from './Page';
import { NavAnchor } from '../TopMenu';
import Exchange from '../Exchange';

export default ({ children, exchange }) => (
  <Page name={<Exchange exchange={exchange} border={null} level={2} />}>
    <Box direction='row' align='center'>
      <NavAnchor path={`/exchanges/prices/${exchange}`} label='Prices' />
      <NavAnchor path={`/exchanges/order_books/${exchange}`} label='Order books' />
      <NavAnchor path={`/exchanges/currencies/${exchange}`} label='Currencies' />
      <NavAnchor path={`/exchanges/fees/${exchange}`} label='Fees' />
    </Box>
    <Box align='center'>
      {children}
    </Box>
  </Page>
);
