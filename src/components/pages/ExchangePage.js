import React from 'react';
import { Box } from 'grommet';
import Page from './Page';
import { NavAnchor } from '../utils/Links';
import Exchange from '../Exchange';

export default ({ children, exchange }) => (
  <Page name={<Exchange exchange={exchange} border={null} level={2} />}>
    <Box direction='row' align='center' gap='small'>
      <NavAnchor
        path={`/exchanges/prices/${exchange}`}
        label='Prices'
        a11yTitle={`Pricing for favorite tickers on ${exchange}`}
      />
      <NavAnchor
        path={`/exchanges/order_books/${exchange}`}
        label='Order books'
        a11yTitle={`Order books on ${exchange}`}
      />
      <NavAnchor
        path={`/exchanges/currencies/${exchange}`}
        label='Currencies'
        a11yTitle={`Available currencies on ${exchange}`}
      />
      <NavAnchor
        path={`/exchanges/fees/${exchange}`}
        label='Fees'
        a11yTitle={`Funding and trading fees on ${exchange}`}
      />
    </Box>
    <Box align='center'>
      {children}
    </Box>
  </Page>
);
