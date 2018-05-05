/**
 * Created by atanasster on 6/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'grommet';
import BaseProperty from './BaseProperty';
import FlatField from './FlatField';

export default class BooleanField extends BaseProperty {
  onValueChange = () => {
    this.updateParent(!this.getValue());
  };

  render() {
    const { label } = this.props;
    return (
      <FlatField label={label}>
        <CheckBox
          checked={!!this.getValue()}
          onChange={this.onValueChange}
        />
      </FlatField>
    );
  }
}

BooleanField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
};
