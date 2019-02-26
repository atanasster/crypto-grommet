import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Select, FormField } from 'grommet';
import tensorflow from '../../../../tensorflow/config';
// import FormField from '../../../grommet/FormField/FormField';
import NumericEditor from './NumericEditor';
import BooleanEditor from './BooleanEditor';
import TextEditor from './TextEditor';
import ColorEditor from './ColorEditor';
import SelectEditor from './SelectEditor';

class ComposedEditor extends React.Component {
  onPropertyChange = (name, newValue) => {
    const { value, onChange } = this.props;
    if (value) {
      onChange(this.props.name, { ...value, config: { ...value.config, [name]: newValue } });
    }
  };

  onChange = (option) => {
    const { value, onChange, name } = this.props;
    if (value) {
      const tfObject = tensorflow.createObject({ type: value.type, config: { type: option } });
      if (tfObject) {
        onChange(name, tfObject.streamable);
      }
    }
  };

  render() {
    const { value, inlineField, label: propLabel } = this.props;
    let options;
    let selected = '';
    let label = propLabel;
    let properties;
    if (value) {
      const tfObject = tensorflow.createObject(value);
      const prop = tfObject.container;
      if (propLabel === undefined) {
        ({ label } = prop);
      }
      options = prop.options.map(option => option.displayName);
      if (prop.value) {
        selected = prop.value.constructor.displayName;
        properties = prop.value.properties.map((item, index) => {
          const key = `${prop.name}_${item.name}_${index}`;
          switch (item.dataType) {
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
            case 'text':
              return (
                <TextEditor
                  key={key}
                  value={item}
                  onChange={this.onPropertyChange}
                />);
            case 'color':
              return (
                <ColorEditor
                  key={key}
                  value={item}
                  onChange={this.onPropertyChange}
                />);
            case 'select':
              return (
                <SelectEditor
                  key={key}
                  value={item}
                  onChange={this.onPropertyChange}
                />);
            case 'composed':
              return (
                <ComposedEditor
                  key={key}
                  name={item.name}
                  label={item.label}
                  value={{
                    type: item.type,
                    config: item.value ?
                      { type: item.value.displayName, ...item.value.streamable } : {},
                  }}
                  onChange={this.onPropertyChange}
                />);
            default:
              return null;
          }
        });
      }
    }
    let editor = (
      <Fragment>
        <Select
          options={options}
          value={selected}
          onChange={({ option }) => this.onChange(option)}
        />
        <Box gap='small' pad='small'>
          {properties}
        </Box>
      </Fragment>
    );
    if (inlineField) {
      editor = (
        <FormField
          label={label}
        >
          {editor}
        </FormField>
      );
    }
    return (
      <Box>
        {editor}
      </Box>
    );
  }
}

ComposedEditor.defaultProps = {
  value: undefined,
  inlineField: true,
};

ComposedEditor.propTypes = {
  value: PropTypes.object,
  inlineField: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default ComposedEditor;
