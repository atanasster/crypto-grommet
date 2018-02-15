import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Paragraph,
  Anchor,
  Text,
  RoutedAnchor,
  Markdown,
} from 'grommet';
import TopMenu from '../TopMenu';

const LargeParagraph = styled(Paragraph)`
  max-width: 100%;
`;

export default class Page extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderMessages = () => {
    const { messages } = this.props;
    const colorMap = {
      error: 'status-critical',
      warning: 'status-warning',
      info: 'status-disabled',
    };
    const msg = messages.map((message, idx) => (
      <Box
        background={colorMap[message.type]}
        pad='small'
        key={`message_${idx}`}
        alignContent='stretch'
      >
        <Markdown
          components={{ p: { component: Text, props: { size: 'large' } } }}
          content={message.message}
        />
      </Box>
    ));
    return (
      <Fragment>
        {msg}
      </Fragment>
    );
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
                content={description}
              />
            ) : null}
          </Box>
        </Box>
      );
    }
    return (
      <Box>
        <Box pad={{ horizontal: 'large', top: 'medium' }}>
          <TopMenu />
          {this.renderMessages()}
          {header}
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
              <RoutedAnchor
                path='/about'
                label='about'
                a11yTitle='About crypto-grommet'
              />
            </Box>
            <Box margin={{ horizontal: 'small' }}>
              <Anchor
                href='https://github.com/atanasster/crypto-grommet'
                target='_blank'
                label='git'
                a11yTitle='Go to the github page for this project'
              />
            </Box>

          </Box>
        </Box>
      </Box>
    );
  }
}

Page.propTypes = {
  description: PropTypes.string,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['error', 'warning', 'info']),
    }),
  ),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Page.defaultProps = {
  description: undefined,
  name: undefined,
  messages: [],
};
