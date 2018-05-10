import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'grommet';
import FlatField from './FlatField';

export default class SelectEditor extends React.Component {
  onChange = (event) => {
    const { options } = this.props.value;
    const { value, onChange } = this.props;
    const newValue = options.find(o => o.label === event.option);
    if (newValue) {
      onChange(value.name, newValue.value);
    }
  }
  render() {
    const {
      label, name, value, options,
    } = this.props.value;
    const v = options.find(o => o.value === value);
    return (
      <FlatField label={label} htmlFor={name}>
        <Select
          name={name}
          options={options.map(item => (item.label))}
          value={v && v.label ? v.label : ''}
          onChange={this.onChange}
        />
      </FlatField>
    );
  }
}

SelectEditor.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
