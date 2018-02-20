import React from 'react';
import { Box } from 'grommet';
import Page from '../../components/Page';
import { NavAnchor } from '../../components/utils/Links';

export default ({ children, name }) => (
  <Page name={name}>
    <Box direction='row' align='center' gap='small'>
      <NavAnchor
        path={'/markets'}
        label='Table'
        a11yTitle={'Ranked table by market capitalization'}
      />
      <NavAnchor
        path={'/markets/distribution'}
        label='Distribution'
        a11yTitle={'Distribution chart by market capitalization'}
      />
    </Box>
    <Box align='center' fill='horizontal' margin={{ vertical: 'medium' }}>
      {children}
    </Box>
  </Page>
);
