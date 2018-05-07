import React from 'react';
import PropTypes from 'prop-types';
import { Box, Select } from 'grommet';
import FormField from '../../../grommet/FormField/FormField';
import NumericEditor from './NumericEditor';
import BooleanEditor from './BooleanEditor';

class ComposedEditor extends React.Component {
  onPropertyChange = (name, newValue) => {
    const { value, onChange } = this.props;
    if (value) {
      const prop = value.properties[0];
      const val = prop.value.getValue();
      onChange(prop.value.constructor.displayName, { ...val, [name]: newValue });
    }
  }
  render() {
    const { value, onChange } = this.props;
    let options;
    let selected;
    let label;
    let properties;
    if (value) {
      const prop = value.properties[0];
      ({ label } = prop);
      options = prop.options.map(option => option.displayName);
      selected = prop.value.constructor.displayName;
      properties = prop.value.properties.map((item, index) => {
        const key = `${prop.name}_${item.name}_${index}`;
        switch (item.type) {
          case 'number':
            return (
              <NumericEditor
                key={key}
                value={item}
                onChange={this.onPropertyChange}
              />);
          case 'bool':
            return (
              <BooleanEditor
                key={key}
                value={item}
                onChange={this.onPropertyChange}
              />);
          default: return null;
        }
      });
    }
    return (
      <Box>
        <FormField
          label={label}
        >
          <Select
            options={options}
            value={selected}
            onChange={({ option }) => onChange(option)}
          />
          <Box gap='small' pad='small'>
            {properties}
          </Box>
        </FormField>
      </Box>
    );
  }
}

ComposedEditor.defaultProps = {
  value: undefined,
};

ComposedEditor.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default ComposedEditor;
