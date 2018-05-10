import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import SideLayer from '../../SideLayer';
import ComposedEditor from './editors/ComposedEditor';

export default class EditLayer extends Component {
  constructor(props) {
    super();
    this.state = {
      layer: props.layer,
    };
  }


  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSave(this.state.layer);
  };

  onChange = (name, value) => {
    const { layer } = this.state;
    this.setState({ layer: { ...layer, ...value } });
  };
  render() {
    const { layer } = this.state;
    return (
      <SideLayer onClose={this.props.onClose} heading={layer.config.type}>
        <ComposedEditor
          inlineField={false}
          value={layer}
          onChange={this.onChange}
        />

        <Box pad={{ vertical: 'large' }}>
          <Button
            primary={true}
            type='submit'
            label='Save'
            onClick={this.onSubmit}
          />
        </Box>
      </SideLayer>
    );
  }
}


EditLayer.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  layer: PropTypes.object.isRequired,
};

