import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withTheme } from 'grommet/components/hocs';
import {
  Heading,
  Paragraph,
  Anchor,
  RoutedAnchor,
  Markdown,
  Box,
} from 'grommet';
import Notifications from '../components/Notifications';
import NavMenu from './NavMenu';

const LargeParagraph = styled(Paragraph)`
  max-width: 100%;
`;

class Page extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { children, description, name } = this.props;
    let header;
    if (name) {
      header = (
        <Box direction='row' responsive={true}>
          <Box margin={{ vertical: 'medium' }} align='start'>
            <Heading level={1}>
              <strong>{name}</strong>
            </Heading>
            {description ? (
              <Markdown
                components={{ p: { component: LargeParagraph, props: { size: 'medium' } } }}
              >
                {description}
              </Markdown>
            ) : null}
          </Box>
        </Box>
      );
    }
    return (
      <Box pad={{ horizontal: 'large', top: 'medium' }}>
        <NavMenu />
        <Notifications />
        {header}
        {children}
        <Box
          tag='footer'
          direction='row'
          justify='center'
          pad={{ top: 'large' }}
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
              path='/about'
              label='about'
              a11yTitle='About crypto-grommet'
            />
            <Anchor
              href='https://github.com/atanasster/crypto-grommet'
              target='_blank'
              label='git'
              a11yTitle='Go to the github page for this project'
            />
          </Box>
        </Box>
      </Box>
    );
  }
}

Page.propTypes = {
  description: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Page.defaultProps = {
  description: undefined,
  name: undefined,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default withTheme(connect(mapStateToProps)(Page));
