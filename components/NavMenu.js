import React, { Component } from 'react';
import { Box, Anchor, Menu, Text } from 'grommet';
import { Menu as MenuIcon, User } from 'grommet-icons';
import { Header } from 'grommet-controls';
import { bindActionCreators } from 'redux';
import AppIcon from './Logo';
import connect from '../redux/index';
import Login from './auth/AuthSideBar';
import RoutedAnchor from './RoutedAnchor';
import SearchEntity from './entities/SearchEntity';
import routerPush from './Router';
import { navActivate } from '../redux/nav/actions';
import { signOut } from '../redux/auth/actions';

class NavMenu extends Component {
  state = { loginForm: false };
  onResponsiveMenu = () => {
    const { nav: { active } } = this.props;
    this.props.navActivate(!active);
  };

  onCloseMenu = () => {
    this.props.navActivate(false);
  };

  onLogOut = () => {
    this.props.signOut();
    routerPush({ route: 'home' });
  };

  renderMenu() {
    const { nav, user } = this.props;
    let menu;
    if (nav.responsive) {
      menu = (
        <Menu
          dropAlign={{ top: 'bottom', right: 'right' }}
          icon={<MenuIcon />}
          items={nav.items.map(item => ({ ...item, onClick: () => { routerPush(item); } }))}
        />
      );
    } else {
      menu = (
        <Box direction='row' align='center' justify='end' gap='small' tag='nav'>
          {nav.items.map((item, index) => (
            <RoutedAnchor key={`nav_item_${index}`} {...item} />
          ))}
          {user ? (
            <Menu
              dropAlign={{ top: 'bottom', right: 'right' }}
              label={user.username}
              items={[{ label: 'log out', a11yTitle: 'Log out of the site', onClick: this.onLogOut }]
                .concat(nav.user_items.map(item =>
                ({ ...item, onClick: () => { routerPush(item); } })))
              }
            />
          ) : (
            <Anchor
              icon={<User />}
              a11yTitle='Open login form'
              onClick={() => this.setState({ loginForm: true })}
            />
          )
          }
        </Box>
      );
    }
    return menu;
  }
  onSearchSelect = ({ link, entity }) => {
    routerPush({
      route: link.route,
      params: link.routeParams ? link.routeParams(entity) : { symbol: entity.slug },
    });
  };

  render() {
    const { loginForm } = this.state;
    let layer;
    if (loginForm) {
      layer = <Login onClose={() => this.setState({ loginForm: false })} />;
    }
    return (
      <React.Fragment>
        <Header
          position='sticky'
        >
          <Box direction='row' align='center' gap='small'>
            <AppIcon
              color='plain'
              size='large'
            />
            <RoutedAnchor route='home' a11yTitle='Go to home page' >
              <Text size='large'>crypto-grommet</Text>
            </RoutedAnchor>
          </Box>
          <Box direction='row' align='center' gap='small'>
            <Box>
              <SearchEntity
                onChange={this.onSearchSelect}
              />
            </Box>
            {this.renderMenu()}
          </Box>
        </Header>
        {layer}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ navActivate, signOut }, dispatch);


const mapStateToProps = state => ({
  nav: state.nav,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
