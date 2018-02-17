import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, RoutedAnchor } from 'grommet';
import { Bitcoin as AppIcon, Menu } from 'grommet-icons';
import CurrencySelect from './currencies/CurrencySelect';
import { NavAnchor } from './utils/Links';

class NavMenu extends Component {
  render() {
    const { nav } = this.props;
    return (
      <Box
        tag='header'
        direction='row'
        justify='between'
        align='center'
        pad={{ bottom: 'medium' }}
        border='bottom'
      >
        <Box direction='row' align='center' gap='small'>
          {nav.responsive ? <Menu /> : <AppIcon color='plain' /> }
          <RoutedAnchor path='/' label='crypto-grommet' />
        </Box>
        { !nav.active && (
          <Box direction='row' align='center' justify='end' gap='small' tag='nav'>
            {nav.items.map((item, index) => (
              <NavAnchor key={`nav_item_${index}`} {...item} />
            ))}
            <CurrencySelect />
          </Box>
        )}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(NavMenu);
