import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Paragraph,
  RoutedAnchor,
} from 'grommet';
import Nav from '../components/Nav';

export default class Page extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { children, desc, name } = this.props;
    return (
      <Box>
        <Box pad={{ horizontal: 'large', top: 'large' }}>
          <Nav />
          <Box direction='row' responsive={true}>
            <Box margin={{ vertical: 'large' }} basis='large' align='start'>
              <Heading level={1}>
                <strong>{name}</strong>
              </Heading>
              {desc ? (
                <Paragraph size='large'>
                  {desc}
                </Paragraph>
              ) : null}
            </Box>
          </Box>
          {children}
        </Box>


        <Box
          direction='row'
          justify='center'
          pad={{ top: 'xlarge' }}
        >
          <Box
            basis='large'
            pad='large'
            border='top'
            direction='row'
            justify='center'
          >
            <Box margin={{ horizontal: 'small' }}>
              <RoutedAnchor path='/about' label='about' />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

Page.propTypes = {
  desc: PropTypes.object,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

Page.defaultProps = {
  desc: undefined,
};
