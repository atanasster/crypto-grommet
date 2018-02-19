import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grommet, Responsive } from 'grommet';

export default class GrommetResponsive extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: props.theme };
  }

  makeResponsive(mobile) {
    const { theme } = this.props;
    const baseSpacing = mobile ? 16 : 24;
    this.setState({
      theme: {
        ...theme,
        global: {
          ...theme.global,
          edgeSize: {
            none: '0',
            xsmall: `${baseSpacing / 4}px`,
            small: `${baseSpacing / 2}px`,
            medium: `${baseSpacing}px`,
            large: `${baseSpacing * 2}px`,
            xlarge: `${baseSpacing * 4}px`,
          },
        },
        heading: {
          ...theme.heading,
          level: {
            1: {
              medium: { size: `${baseSpacing * 2}px`, height: 1.125, maxWidth: `${baseSpacing * 48}px` },
              small: { size: `${baseSpacing}px`, height: 1.333, maxWidth: `${baseSpacing * 24}px` },
              large: { size: `${baseSpacing * 1.5}px`, height: 1.125, maxWidth: `${baseSpacing * 96}px` },
            },
            2: {
              medium: { size: `${baseSpacing * 1.5}px`, height: 1.23, maxWidth: `${baseSpacing * 36}px` },
              small: { size: `${baseSpacing * 0.8}px`, height: 1.333, maxWidth: `${baseSpacing * 18}px` },
              large: { size: `${baseSpacing * 2}px`, height: 1.125, maxWidth: `${baseSpacing * 48}px` },
            },
            3: {
              medium: { size: `${baseSpacing}px`, height: 1.333, maxWidth: `${baseSpacing * 24}px` },
              small: { size: `${baseSpacing * 0.8}px`, height: 1.333, maxWidth: `${baseSpacing * 18}px` },
              large: { size: `${baseSpacing * 1.5}px`, height: 1.23, maxWidth: `${baseSpacing * 36}px` },
            },
            4: {
              medium: { size: `${baseSpacing * 0.8}px`, height: 1.333, maxWidth: `${baseSpacing * 18}px` },
              small: { size: `${baseSpacing * 0.6}px`, height: 1.375, maxWidth: `${baseSpacing * 16}px` },
              large: { size: `${baseSpacing}px`, height: 1.333, maxWidth: `${baseSpacing * 24}px` },
            },
          },
        },
      },
    });
  }

  onResponsive = (nav) => {
    const mobile = nav === 'narrow';
    const { onResponsive } = this.props;
    this.makeResponsive(mobile);
    if (onResponsive) {
      onResponsive(mobile);
    }
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <Grommet theme={theme}>
        <Responsive onChange={this.onResponsive} >
          {children}
        </Responsive>
      </Grommet>
    );
  }
}

GrommetResponsive.defaultProps = {
  onResponsive: undefined,
  theme: {},
};

GrommetResponsive.propTypes = {
  onResponsive: PropTypes.func,
  theme: PropTypes.object,
};
