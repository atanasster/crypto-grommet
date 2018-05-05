import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormField, Menu } from 'grommet';
import SideLayer from '../../SideLayer';
import { createLayer } from '../keras-defaults';
import LSTMLayer from './classes/LSTMLayer';
import BatchNormalizationLayer from './/classes/BatchNormalizationLayer';
import DenseLayer from './/classes/DenseLayer';
import GRULayer from './classes/GRULayer';
import SimpleRNNLayer from './classes/SimpleRNNLayer';
import DropoutLayer from './classes/DropoutLayer';
import ActivationLayer from './classes/ActivationLayer';

export default class EditLayer extends Component {
  constructor(props) {
    super();
    this.state = {
      layer: props.layer,
      form: this.getLayerProps(props.layer, props),
    };
  }


  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSave(this.state.layer);
  };

  onUpdateValue = (config) => {
    this.setState({ layer: { ...this.state.layer, config } });
  };

  getLayerProps = (layer, props) => {
    let formClass = null;
    const { kerasDefaults } = props || this.props;
    switch (layer.className) {
      case 'LSTM':
        formClass = LSTMLayer;
        break;
      case 'BatchNormalization':
        formClass = BatchNormalizationLayer;
        break;
      case 'Dense':
        formClass = DenseLayer;
        break;
      case 'GRU':
        formClass = GRULayer;
        break;
      case 'SimpleRNN':
        formClass = SimpleRNNLayer;
        break;
      case 'Dropout':
        formClass = DropoutLayer;
        break;
      case 'Activation':
        formClass = ActivationLayer;
        break;
      default: return null;
    }
    return formClass ? React.createElement(formClass,
      {
        value: layer.config,
        defaults: createLayer(kerasDefaults.layers, layer.class_name, {}),
        kerasDefaults,
        onUpdateValue: this.onUpdateValue,
      }) : null;
  };

  onLayerClassChange = (className) => {
    const { kerasDefaults, layer } = this.props;
    const newLayer = createLayer(kerasDefaults.layers, className,
      { units: (layer.config.units ? layer.config.units : 1) });
    this.setState({ layer: newLayer, form: this.getLayerProps(newLayer) });
  };

  render() {
    const { form, layer } = this.state;
    return (
      <SideLayer onClose={this.props.onClose} heading={layer.className}>
        <Box>
          <FormField label='Layer type'>
            <Menu
              items={[{ 'value': 'LSTM', 'label': 'LSTM' },
                        { 'value': 'Dense', 'label': 'Dense' },
                        { 'value': 'GRU', 'label': 'GRU' },
                        { 'value': 'SimpleRNN', 'label': 'SimpleRNN' },
                        { 'value': 'Activation', 'label': 'Activation' },
                        { 'value': 'BatchNormalization', 'label': 'BatchNormalization' },
                        { 'value': 'Dropout', 'label': 'Dropout' },
                        { 'value': 'TimeDistributed', 'label': 'TimeDistributed' },
                        { 'value': 'Bidirectional', 'label': 'Bidirectional' },

              ].map(item => ({ ...item, onClick: () => this.onLayerClassChange(item.value) }))}
              label={layer.className}
            />
          </FormField>
        </Box>
        {form}
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
  kerasDefaults: PropTypes.object.isRequired,
};

