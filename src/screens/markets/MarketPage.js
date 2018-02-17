import React from 'react';
import { Box } from 'grommet';
import Page from '../../components/pages/Page';
import { NavAnchor } from '../../components/TopMenu';

export default ({ children, name }) => (
  <Page name={name}>
    <Box direction='row' align='center'>
      <NavAnchor path={'/markets'} label='Table' />
      <NavAnchor path={'/markets/distribution'} label='Distribution' />
    </Box>
    <Box align='center'>
      {children}
    </Box>
  </Page>
);
