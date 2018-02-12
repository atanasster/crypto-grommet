import React from 'react';
import { connect } from 'react-redux';
import { Box, Text, RoutedAnchor } from 'grommet';
import { Bitcoin as GrommetIcon } from 'grommet-icons';

export const NavAnchor = ({ path, label }) => (
  <Box pad={{ horizontal: 'small' }}>
    <RoutedAnchor path={path} label={label} />
  </Box>
);

const TopMenu = ({ defaultExchange }) => (
  <Box direction='row' justify='between' align='center' pad={{ bottom: 'medium' }} border='bottom'>
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
      <NavAnchor path={`/coins/general/BTC/USD/${defaultExchange}`} label='bitcoin' />
      <NavAnchor path={`/coins/general/ETH/USD/${defaultExchange}`} label='ethereum' />
    </Box>
  </Box>
);


const mapStateToProps = state => ({
  defaultExchange: state.settings.defaultExchange,
});

export default connect(mapStateToProps)(TopMenu);
