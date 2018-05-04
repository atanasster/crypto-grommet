import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Layer, Heading, Paragraph } from 'grommet';

class Confirmation extends React.Component {
  render() {
    const {
      title, actions, onConfirm, onClose, text,
    } = this.props;
    return (
      <Layer
        position='center'
        onEsc={onClose}
        onClickOverlay={onClose}
      >
        <Box pad={{ horizontal: 'medium' }}>
          <Heading level={2} margin='medium'>
            {title}
          </Heading>
          <Paragraph>
            {text}
          </Paragraph>
          <Box direction='row' gap='medium' align='start' margin={{ vertical: 'medium' }}>
            {actions.map((action, index) => {
              const { primary, ...rest } = action;
              if (primary && onConfirm) {
                rest.onClick = onConfirm;
              } else if (onClose !== undefined) {
                rest.onClick = onClose;
              }
              return (
                <Button key={`confirm_${index}`} primary={primary} {...rest} />
              );
            })
            }
          </Box>
        </Box>
      </Layer>
    );
  }
}

Confirmation.defaultProps = {
  actions: [
    { label: 'OK', primary: true },
    { label: 'Cancel' },
  ],
  title: undefined,
  onClose: undefined,
  onConfirm: undefined,
};

Confirmation.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  text: PropTypes.string.isRequired,
  actions: PropTypes.array,
};

export default Confirmation;
