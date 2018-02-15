import React from 'react';
import { connect } from 'react-redux';
import { Box, Text, RoutedAnchor } from 'grommet';
import { Bitcoin as GrommetIcon } from 'grommet-icons';

export const NavAnchor = props => (
  <Box pad={{ horizontal: 'small' }}>
    <RoutedAnchor {...props} />
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
      <NavAnchor path='/exchanges' label='exchanges' a11yTitle='List of exchanges' />
      <NavAnchor path='/coins' label='coins' a11yTitle='List of coins' />
      <NavAnchor path='/icos' label='ICOs' a11yTitle='List of ative and upcoming initial coin offerings' />
      <NavAnchor path={`/coins/general/BTC/USD/${defaultExchange}`} label='bitcoin' a11yTitle='Information about BitCoin' />
      <NavAnchor path={`/coins/general/ETH/USD/${defaultExchange}`} label='ethereum' a11yTitle='Information about Ethereum' />
    </Box>
  </Box>
);


const mapStateToProps = state => ({
  defaultExchange: state.settings.defaultExchange,
});

export default connect(mapStateToProps)(TopMenu);
