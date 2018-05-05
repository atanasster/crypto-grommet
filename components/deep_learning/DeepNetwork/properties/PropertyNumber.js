/**
 * Created by atanasster on 6/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NumberInput } from 'grommet-controls';
import BaseProperty from './BaseProperty';


export default class PropertyNumber extends BaseProperty {
  constructor(props) {
    super(props);
    super.renderComponent = this.renderComponent;
    this.state = { value: props.value };
  }

  onValueChange = (event) => {
    const { value } = event.target;
    this.updateParent(value);
    this.setState({ value });
  }
  renderComponent = () => {
    const {
      min, max, step, decimals,
    } = this.props;
    const { value } = this.state;
    return (
      <NumberInput
        min={min}
        max={max}
        step={step}
        value={value || ''}
        decimals={decimals || null}
        onChange={this.onValueChange}
      />
    );
  }
}

PropertyNumber.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};
