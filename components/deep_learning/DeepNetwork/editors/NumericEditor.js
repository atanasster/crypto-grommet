import React from 'react';
import PropTypes from 'prop-types';
import { NumberInput } from 'grommet-controls';
import FlatField from './FlatField';

export default class NumericEditor extends React.Component {
  onChange = (event) => {
    const { onChange, value } = this.props;
    const { value: newValue } = event.target;
    onChange(value.name, newValue);
  }
  render() {
    const {
      label, min, max, step, name, value,
    } = this.props.value;
    return (
      <FlatField label={label} htmlFor={name}>
        <NumberInput
          name={name}
          min={min}
          max={max}
          step={step}
          value={value || ''}
          onChange={this.onChange}
        />
      </FlatField>
    );
  }
}

NumericEditor.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
