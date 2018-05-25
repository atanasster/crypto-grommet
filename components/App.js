import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import {
  Grommet,
  Responsive,
  Heading,
  Paragraph,
  Anchor,
  Markdown,
  Box,
} from 'grommet';
import { Notification } from 'grommet-controls';
import connect from '../redux';
import Notifications from './Notifications';
import RoutedAnchor from './RoutedAnchor';
import NavMenu from './NavMenu';
import { navActivate, updateResponsive } from '../redux/nav/actions';
import { signIn } from '../redux/auth/actions';
import { selectTheme } from '../redux/themes/actions';
import CURRENT_USER_QUERY from './auth/graphql/CurrentUserQuery.graphql';
import { initGA, logPageView } from './utils/analytics';

const LargeParagraph = styled(Paragraph)`
  max-width: 100%;
`;

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { theme: props.router.query.theme };
  }

  changeTheme(themeName) {
    this.props.selectTheme(themeName);
  }

  componentDidMount() {
    this.props.navActivate(false);
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  onResponsiveMenu = () => {
    const { navMenu: { active } } = this.props;
    this.props.navActivate(!active);
  };
  onResponsive = (size) => {
    this.props.updateResponsive(size === 'narrow');
  };


  onCloseMenu = () => {
    this.props.navActivate(false);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user !== this.props.user) {
      this.props.signIn({ user: nextProps.user });
    }
    if (nextProps.router.query.theme !== this.state.theme) {
      this.setState({ theme: nextProps.router.query.theme });
    }
  }
  onThemeChange = ({ option: theme }) => {
    const { router } = this.props;
    const path = { pathname: router.pathname, query: { ...router.query, theme } };
    this.changeTheme(theme);
    router.replace(path, path, { shallow: true });
  };


  render() {
    const {
      children, description, title, visibleTitle,
      notifications, menu, themes: { themes },
    } = this.props;
    const { theme = 'metro' } = this.state;
    const keywords = ['financeboards', 'equities', 'stock markets', 'crypto', 'cryptocurrencies'];
    if (title) {
      keywords.push(title);
    }

    let header;
    if (title) {
      header = (
        <Box direction='row' responsive={true}>
          <Box margin={{ vertical: 'medium' }} align='start' fill='horizontal'>
            {visibleTitle !== undefined ? visibleTitle : (
              <Heading margin='none' level={1}>
                <strong>{title}</strong>
              </Heading>)
            }
            {description ? (
              <Box pad={{ vertical: 'medium' }}>
                <Markdown
                  components={{ p: { component: LargeParagraph, props: { size: 'medium' } } }}
                >
                  {description}
                </Markdown>
              </Box>
            ) : null}
          </Box>
        </Box>
      );
    }
    return (
      <div>
        <Head>
          {title && (
            <title>{title}</title>
            )
          }
          {typeof description === 'string' && (
            <meta name='description' content={description} />
            )
          }
          <meta name='keywords' content={keywords.join(',')} />
        </Head>
        <Grommet theme={themes[theme] || {}} >
          <Responsive onChange={this.onResponsive}>
            <Box style={{ height: 'auto', minHeight: '100vh' }}>
              <NavMenu />
              <Notifications />
              <Box pad={{ horizontal: 'large', top: 'medium' }} gap='small' flex={true}>
                {menu && menu}
                {notifications && notifications.map(
                  (msg, index) => (<Notification key={`msg_${index}`} {...msg} />)
                )}

                {header}
                <Box >
                  {children}
                </Box>
              </Box>
              <Box
                tag='footer'
                direction='row'
                justify='center'
                pad={{ top: 'large' }}
                justifySelf='end'
              >
                <Box
                  basis='large'
                  border='top'
                  direction='row'
                  justify='center'
                  pad='medium'
                  gap='medium'
                >
                  <RoutedAnchor
                    route='about'
                    label='about'
                    a11yTitle='About crypto-grommet'
                  />
                  <Anchor
                    href='https://github.com/atanasster/crypto-grommet'
                    target='_blank'
                    label='git'
                    a11yTitle='Go to the github page for this project'
                  />
                  <Anchor
                    href='https://spectrum.chat/crypto-grommet'
                    target='_blank'
                    label='spectrum'
                    a11yTitle='Go to the spectrum community for this project'
                  />
                </Box>
              </Box>
            </Box>
          </Responsive>
        </Grommet>
      </div>
    );
  }
}

App.propTypes = {
  description: PropTypes.string,
  notifications: PropTypes.array,
  menu: PropTypes.element,
  title: PropTypes.string.isRequired,
  visibleTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

App.defaultProps = {
  notifications: undefined,
  description: undefined,
  menu: undefined,
  visibleTitle: undefined,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signIn, navActivate, updateResponsive, selectTheme,
  }, dispatch);

const mapStateToProps = state => ({
  nav: state.nav,
  themes: state.themes,
  token: state.auth.token,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(graphql(CURRENT_USER_QUERY, {
  skip: ({ token }) => !token,
  props({ data: { loading, currentUser, refetch } }) {
    return { userLoading: loading, user: currentUser, refetchCurrentUser: refetch };
  },
})(App)));
