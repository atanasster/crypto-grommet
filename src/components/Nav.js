import React from 'react';

import { Box, Text, RoutedAnchor } from 'grommet';
import { Bitcoin as GrommetIcon } from 'grommet-icons';

const NavAnchor = ({ path, label }) => (
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
      <NavAnchor path='/order_book/BTC/USD' label='bitcoin' />
      <NavAnchor path='/order_book/ETH/USD' label='ethereum' />
    </Box>
  </Box>
);
