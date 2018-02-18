import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, RoutedAnchor, Layer } from 'grommet';
import { Bitcoin as AppIcon, Menu } from 'grommet-icons';
import { bindActionCreators } from 'redux';
import CurrencySelect from './currencies/CurrencySelect';
import { NavAnchor } from './utils/Links';
import { navActivate } from '../actions/nav/actions';

class NavMenu extends Component {
  onResponsiveMenu = () => {
    const { nav: { active } } = this.props;
    this.props.navActivate(!active);
  };

  onCloseMenu = () => {
    this.props.navActivate(false);
  };

  renderMenu() {
    const { nav } = this.props;
    const items = nav.items.map((item, index) => (
      <NavAnchor key={`nav_item_${index}`} {...item} />
    ));
    let menu;
    if (nav.responsive) {
      if (nav.active) {
        menu = (
          <Layer plain={true} onEsc={this.onCloseMenu} position='left' onClickOverlay={this.onCloseMenu}>
            <Box background='brand' gap='small' style={{ height: '100vh' }} pad='small'>
              <Menu onClick={this.onResponsiveMenu} />
              <CurrencySelect />
              <NavAnchor path='/' label='home' a11yTitle='go to home page' />
              {items}
            </Box>
          </Layer>
        );
      }
    } else {
      menu = (
        <Box direction='row' align='center' justify='end' gap='small' tag='nav'>
          {items}
          <CurrencySelect basis='small' />
        </Box>
      );
    }
    return menu;
  }
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
          {nav.responsive ? <Menu onClick={this.onResponsiveMenu} /> : <AppIcon color='plain' /> }
          <RoutedAnchor path='/' label='crypto-grommet' />
        </Box>
        {this.renderMenu()}
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ navActivate }, dispatch);


const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
