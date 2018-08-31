import React from 'react';
import PropTypes from 'prop-types';
import { ColorInput, materialColors } from 'grommet-controls';
import FlatField from './FlatField';


export default class ColorEditor extends React.Component {
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
        <ColorInput
          colors={materialColors}
          name={name}
          value={value || ''}
          onChange={this.onChange}
        />
      </FlatField>
    );
  }
}

ColorEditor.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
