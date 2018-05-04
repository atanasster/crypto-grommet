/**
 * Created by atanasster on 6/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'grommet';
import BaseProperty from './BaseProperty';


export default class PropertyText extends BaseProperty {
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
  renderComponent() {
    const { name } = this.props;
    const { value } = this.state;
    return (
      <TextInput
        name={name}
        value={value || ''}
        onChange={this.onValueChange}
      />
    );
  }
}

PropertyText.propTypes = {
  value: PropTypes.string,
};
