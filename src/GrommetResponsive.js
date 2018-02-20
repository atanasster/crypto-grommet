import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grommet, Responsive } from 'grommet';

export default class GrommetResponsive extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { theme: props.theme };
  }

  makeResponsive(mobile) {
    const { theme } = this.props;
    const baseSpacing = mobile ? 16 : 24;
    const borderWidth = mobile ? 1 : 2;
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
          spacing: `${baseSpacing}px`,
          size: {
            xxsmall: `${baseSpacing * 2}px`, // 48
            xsmall: `${baseSpacing * 4}px`, // 96
            small: `${baseSpacing * 8}px`, // 192
            medium: `${baseSpacing * 16}px`, // 384
            large: `${baseSpacing * 32}px`, // 768
            xlarge: `${baseSpacing * 48}px`, // 1152
            full: '100%',
          },
        },
        heading: {
          ...theme.heading,
          level: {
            1: {
              medium: {
                size: `${baseSpacing * 2}px`,
                height: 1.125,
                maxWidth: `${baseSpacing * 48}px`,
              },
              small: { size: `${baseSpacing}px`, height: 1.333, maxWidth: `${baseSpacing * 24}px` },
              large: {
                size: `${baseSpacing * 1.5}px`,
                height: 1.125,
                maxWidth: `${baseSpacing * 96}px`,
              },
            },
            2: {
              medium: {
                size: `${baseSpacing * 1.5}px`,
                height: 1.23,
                maxWidth: `${baseSpacing * 36}px`,
              },
              small: {
                size: `${baseSpacing * 0.8}px`,
                height: 1.333,
                maxWidth: `${baseSpacing * 18}px`,
              },
              large: {
                size: `${baseSpacing * 2}px`,
                height: 1.125,
                maxWidth: `${baseSpacing * 48}px`,
              },
            },
            3: {
              medium: {
                size: `${baseSpacing}px`,
                height: 1.333,
                maxWidth: `${baseSpacing * 24}px`,
              },
              small: {
                size: `${baseSpacing * 0.8}px`,
                height: 1.333,
                maxWidth: `${baseSpacing * 18}px`,
              },
              large: {
                size: `${baseSpacing * 1.5}px`,
                height: 1.23,
                maxWidth: `${baseSpacing * 36}px`,
              },
            },
            4: {
              medium: {
                size: `${baseSpacing * 0.8}px`,
                height: 1.333,
                maxWidth: `${baseSpacing * 18}px`,
              },
              small: {
                size: `${baseSpacing * 0.6}px`,
                height: 1.375,
                maxWidth: `${baseSpacing * 16}px`,
              },
              large: { size: `${baseSpacing}px`, height: 1.333, maxWidth: `${baseSpacing * 24}px` },
            },
          },
        },
        text: {
          medium: { size: `${baseSpacing * 0.7}px`, height: 1.375 },
          xsmall: { size: `${baseSpacing * 0.5}px`, height: 1.5 },
          small: { size: `${baseSpacing * 0.6}px`, height: 1.43 },
          large: { size: `${baseSpacing}px`, height: 1.167 },
          xlarge: { size: `${baseSpacing * 1.5}px`, height: 1.1875 },
          xxlarge: { size: `${baseSpacing * 2}px`, height: 1.125 },
        },
        button: {
          ...theme.button,
          minWidth: `${baseSpacing * 4}px`,
          maxWidth: `${baseSpacing * 16}px`,
          border: {
            ...(theme.button ? theme.button.border : {}),
            width: `${borderWidth}px`,
          },
          padding: {
            ...(theme.button ? theme.button.padding : {}),
            vertical: `${(baseSpacing / 2) - borderWidth}px`,
            horizontal: `${(baseSpacing / 2) - borderWidth}px`,
          },
        },
        checkBox: {
          ...theme.checkBox,
          size: `${baseSpacing}px`,
          toggle: {
            ...(theme.checkBox ? theme.checkBox.toggle : {}),
            radius: `${baseSpacing}px`,
            size: `${baseSpacing * 2}px`,
          },
        },
        paragraph: {
          ...theme.paragraph,
          medium: { size: `${baseSpacing * 0.75}px`, height: 1.375, maxWidth: `${baseSpacing * 16}px` },
          small: { size: `${baseSpacing * 0.6}px`, height: 1.43, maxWidth: `${baseSpacing * 14}px` },
          large: { size: `${baseSpacing}px`, height: 1.333, maxWidth: `${baseSpacing * 24}px` },
          xlarge: { size: `${baseSpacing * 1.5}px`, height: 1.1875, maxWidth: `${baseSpacing * 32}px` },
        },
        radioButton: {
          ...theme.radioButton,
          size: `${baseSpacing}px`,
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
