/**
 * Created by atanasster on 6/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'grommet';
import FlatField from './FlatField';
import BaseProperty from './BaseProperty';

export default class SelectField extends BaseProperty {
  onValueChange = (value) => {
    this.updateParent(value);
  }

  render() {
    const { label, options, value } = this.props;
    const selected = options.find(item => item.value === value);
    return (
      <FlatField label={label}>
        <Menu
          items={options.map(item => ({ ...item, onClick: () => this.onValueChange(item.value) }))}
          label={selected ? selected.label : undefined}
        />
      </FlatField>
    );
  }
}

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};
