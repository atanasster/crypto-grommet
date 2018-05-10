import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'grommet';
import FlatField from './FlatField';

export default class TextEditor extends React.Component {
  onChange = (event) => {
    const { onChange, value } = this.props;
    const { value: newValue } = event.target;
    onChange(value.name, newValue);
  }
  render() {
    const {
      label, name, value,
    } = this.props.value;
    return (
      <FlatField label={label} htmlFor={name}>
        <TextInput
          name={name}
          value={value || ''}
          onChange={this.onChange}
        />
      </FlatField>
    );
  }
}

TextEditor.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
