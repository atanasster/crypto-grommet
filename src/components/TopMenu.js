import React from 'react';
import { connect } from 'react-redux';
import { Box, Text, RoutedAnchor } from 'grommet';
import { Bitcoin as GrommetIcon } from 'grommet-icons';
import CurrencySelect from './currencies/CurrencySelect';

export const NavAnchor = props => (
  <Box pad={{ horizontal: 'small' }}>
    <RoutedAnchor {...props} />
  </Box>
);

const TopMenu = ({ defaultExchange, defaultCurrency }) => (
  <Box direction='row' justify='between' align='center' pad={{ bottom: 'medium' }} border='bottom'>
    <RoutedAnchor path='/'>
      <Box direction='row' align='center'>
        <GrommetIcon color='plain' />
        <Box margin={{ horizontal: 'small' }}>
          <Text>crypto-grommet</Text>
        </Box>
      </Box>
    </RoutedAnchor>
    <Box direction='row' align='center' justify='end'>
      <NavAnchor path='/markets' label='markets' a11yTitle='Market cap table of crypto coins' />
      <NavAnchor path='/exchanges' label='exchanges' a11yTitle='List of exchanges' />
      <NavAnchor path='/coins' label='coins' a11yTitle='List of coins' />
      <NavAnchor path='/icos' label='ICOs' a11yTitle='List of ative and upcoming initial coin offerings' />
      <NavAnchor path={`/coins/general/BTC/${defaultCurrency}/${defaultExchange}`} label='bitcoin' a11yTitle='Information about BitCoin' />
      <NavAnchor path={`/coins/general/ETH/${defaultCurrency}/${defaultExchange}`} label='ethereum' a11yTitle='Information about Ethereum' />
      <CurrencySelect />
    </Box>
  </Box>
);


const mapStateToProps = state => ({
  defaultExchange: state.settings.defaultExchange,
  defaultCurrency: state.settings.defaultCurrency,
});

export default connect(mapStateToProps)(TopMenu);
