import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Markdown } from 'grommet';

class Notification extends Component {
  componentDidMount() {
    if (this.props.duration) {
      this.timer = setTimeout(this.onClose, this.props.duration);
    }
  }

  onClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }
  render() {
    const { status, message } = this.props;
    return (
      <Box
        background={{
          color: status !== 'normal' ? `status-${status}` : undefined,
          opacity: 'weak',
        }}
        animation='fadeIn'
        pad='small'
        fill='horizontal'
        alignContent='stretch'
      >
        <Markdown components={{ p: { component: Text, props: { size: 'large' } } }}>
          {message}
        </Markdown>
      </Box>
    );
  }
}

Notification.defaultProps = {
  duration: undefined,
  onClose: undefined,
};

Notification.propTypes = {
  status: PropTypes.oneOf(['ok', 'warning', 'critical', 'disabled', 'normal']).isRequired,
  duration: PropTypes.number,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default Notification;
