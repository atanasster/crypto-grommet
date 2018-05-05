/**
 * Created by atanasster on 6/5/17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormField } from 'grommet';

export default class BaseProperty extends Component {
  updateParent = (value) => {
    this.props.onUpdateValue(this.props.name, value, this.props.default);
  }

  getName = () => this.props.name;
  getValue = () => this.props.value;

  render() {
    const { label, help } = this.props;
    return (
      <FormField label={label} help={help}>
        {this.renderComponent && this.renderComponent()}
      </FormField>
    );
  }
}

BaseProperty.defaultProps = {
  help: undefined,
};

BaseProperty.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onUpdateValue: PropTypes.func.isRequired,
  help: PropTypes.string,
};
