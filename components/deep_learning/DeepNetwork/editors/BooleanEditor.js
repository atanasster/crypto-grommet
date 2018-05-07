import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'grommet';
import FlatField from './FlatField';

export default class NumericEditor extends React.Component {
  onChange = () => {
    const { onChange, value } = this.props;
    onChange(value.name, !value.value);
  }
  render() {
    const {
      label, name, value,
    } = this.props.value;
    return (
      <FlatField label={label} htmlFor={name}>
        <CheckBox
          checked={!!value}
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
