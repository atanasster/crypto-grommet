/**
 * Created by atanasster on 6/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NumberInput } from 'grommet-controls';
import FlatField from './FlatField';
import BaseProperty from './BaseProperty';

export default class NumericField extends BaseProperty {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  onValueChange = (event) => {
    const { value } = event.target;
    this.updateParent(value);
    this.setState({ value });
  }
  render() {
    const {
      label, min, max, step, decimals,
    } = this.props;
    const { value } = this.state;
    return (
      <FlatField label={label}>
        <NumberInput
          min={min}
          max={max}
          step={step}
          value={value || ''}
          decimals={decimals || null}
          onChange={this.onValueChange}
        />
      </FlatField>
    );
  }
}

NumericField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};
