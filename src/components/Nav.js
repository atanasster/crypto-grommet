import React from 'react';

import { Box, Text, RoutedAnchor } from 'grommet';
import { Bitcoin as GrommetIcon } from 'grommet-icons';

export const NavAnchor = ({ path, label }) => (
  <Box pad={{ horizontal: 'small' }}>
    <RoutedAnchor path={path} label={label} />
  </Box>
);

export default () => (
  <Box direction='row' justify='between' align='center'>
    <RoutedAnchor path='/'>
      <Box direction='row' align='center'>
        <GrommetIcon color='plain' />
        <Box margin={{ horizontal: 'small' }}>
          <Text>crypto-grommet</Text>
        </Box>
      </Box>
    </RoutedAnchor>
    <Box direction='row' align='center'>
      <NavAnchor path='/exchanges' label='exchanges' />
      <NavAnchor path='/coins' label='coins' />
      <NavAnchor path='/coins/info/BTC/USD/Bitstamp' label='bitcoin' />
      <NavAnchor path='/coins/info/ETH/USD/Bitstamp' label='ethereum' />
    </Box>
  </Box>
);
