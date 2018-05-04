/**
 * Created by atanasster on 2/14/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Menu } from 'grommet';

export default class MenuSelect extends Component {
  onClick = (e, item) => {
    this.props.onChange({ ...e, option: item, id: this.props.id });
  };

  render() {
    const value = this.props.options.find(d => (d.value === this.props.value));
    const label = value ? value.label : null;
    const items = this.props.options.map(item => ({
      label: item.label,
      onClick: e => this.onClick(e, item),
    }));
    return (
      <Box pad={{ horizontal: 'small' }}>
        <Menu label={label} size='small' items={items} />
      </Box>
    );
  }
}

MenuSelect.defaultProps = {
  value: undefined,
};

MenuSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
};
