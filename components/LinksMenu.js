import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import RoutedButton from './RoutedButton';

export default class LinksMenu extends Component {
  render() {
    const { items, activeItem } = this.props;
    return (
      <Box direction='row' align='center' tag='nav' gap='small'>
        {items.map((item, index) => {
          const { label, ...rest } = item;
          return (
            <RoutedButton label={label} active={index === activeItem} key={`menu_item_${index}`} {...rest} />
          );
        })}
      </Box>
    );
  }
}

LinksMenu.propTypes = {
  items: PropTypes.array.isRequired,
  activeItem: PropTypes.number.isRequired,
};
