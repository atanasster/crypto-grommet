/**
 * Created by atanasster on 6/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'grommet';
import BaseProperty from './BaseProperty';

export default class PropertyBoolean extends BaseProperty {
  constructor(props) {
    super(props);
    super.renderComponent = this.renderComponent;
    this.state = { value: props.value };
  }
  onValueChange = () => {
    const value = !this.state.value;
    this.updateParent(value);
    this.setState({ value });
  };
  renderComponent = () => {
    const { value } = this.state;
    return (
      <CheckBox checked={!!value} onChange={this.onValueChange} />
    );
  }
}

PropertyBoolean.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
};
