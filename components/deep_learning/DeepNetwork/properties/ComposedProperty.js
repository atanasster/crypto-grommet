/**
 * Created by atanasster on 6/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Menu } from 'grommet';
import FormField from '../../../grommet/FormField/FormField';
import BaseProperty from './BaseProperty';

export default class ComposedProperty extends BaseProperty {
  static getSettings = () => null;
  constructor(props) {
    super(props);
    const config = this.getConfig(props.value);
    const className = this.getClassName(props.value);
    this.state = {
      value: config,
      className,
      fieldsForm: this.updateFieldsForm(className, config),
    };
  }

  parentUpdate = (className, config) => {
    let obj;
    if (config) {
      obj = { className, config };
    } else { obj = className; }
    this.updateParent(obj);
  };

  onUpdateValue = (value) => {
    this.setState({ value });
    const { className } = this.state;
    this.parentUpdate(className, value);
  };

  getClassName = (obj) => {
    if (typeof obj === 'string' || !obj) { return obj; }
    return obj.className;
  };

  getConfig = (obj) => {
    if (typeof obj === 'string' || !obj || obj.config === undefined) {
      return null;
    }
    return obj.config;
  };

  findDefaults = (className) => {
    const { defaults } = this.props;
    for (let i = 0; i < defaults.length; i += 1) {
      if (defaults[i].className === className) { return defaults[i].config; }
    }
    return {};
  };

  updateFieldsForm = (className, config) => {
    const { kerasDefaults } = this.props;
    if (!className) {
      return null;
    }
    const cls = this.constructor.getSettings(className);
    if (!cls) {
      return null;
    }
    return React.createElement(cls,
      {
        notForm: true,
        value: config || {},
        defaults: this.findDefaults(className),
        kerasDefaults,
        onUpdateValue: this.onUpdateValue,
      });
  };


  onValueChange = (className) => {
    const value = this.findDefaults(className);
    this.setState({ value, className, fieldsForm: this.updateFieldsForm(className, value) });
    this.parentUpdate(className, value);
  };

  render() {
    const { options } = this.props;
    const { className, fieldsForm } = this.state;
    const { label } = this.props;
    const selected = options.find(item => item.value === className);
    return (
      <FormField label={label}>
        <Box gap='small'>
          <Menu
            items={options.map(item => ({
              ...item,
              onClick: () => this.onValueChange(item.value),
            }))}
            label={selected ? selected.label : undefined}
          />
          <Box pad={{ horizontal: 'small' }}>
            {fieldsForm}
          </Box>
        </Box>
      </FormField>
    );
  }
}

ComposedProperty.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  options: PropTypes.array.isRequired,
  defaults: PropTypes.array.isRequired,
  kerasDefaults: PropTypes.object.isRequired,

};
