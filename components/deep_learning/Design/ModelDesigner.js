/**
 * Created by atanasster on 7/11/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, Menu, Stack, FormField, Button } from 'grommet';
import { SettingsOption } from 'grommet-icons';
import { NumberInput } from 'grommet-controls';
import Diagram from '../../grommet/Diagram/Diagram';
import EditLayer from './EditLayer';
import Confirmation from '../../grommet-controls/Confirmation/Confirmation';
import SelectDataset from '../../datasets/SelectDataset';
import Nodes, { nodeName } from './Nodes';
import Features from './Features';
import Targets from './Targets';
import ComposedEditor from './editors/ComposedEditor';
import TrainModel from '../Execution/Train';

const calcDiagramEdgePoints = ({ fromRect, toRect, containerRect }) => {
  const fromPoint = [
    (fromRect.x - containerRect.x) + (fromRect.width / 2),
    (fromRect.y - containerRect.y) + (fromRect.height),
  ];
  const toPoint = [
    (toRect.x - containerRect.x) + (toRect.width / 2),
    (toRect.y - containerRect.y),
  ];
  return [fromPoint, toPoint];
};

const layerConnections = (indexFrom, fromLayer, indexTo, toLayer) => {
  const connections = [];
  for (let from = 0; from < (fromLayer.length || fromLayer.config.units); from += 1) {
    for (let to = 0; to < (toLayer.length || toLayer.config.units); to += 1) {
      connections.push({
        fromTarget: nodeName(indexFrom, from),
        toTarget: nodeName(indexTo, to),
        color: 'dark-5',
        thickness: '2',
        round: true,
        type: 'curved',
      });
    }
  }
  return connections;
};

const moveArrayItem = (arr, oldIndex, direction) => {
  if (oldIndex >= 0) {
    const newIndex = direction === 'up' ? oldIndex - 1 : oldIndex + 1;
    if (newIndex >= 0 && newIndex < arr.length) {
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }
  }
  return arr;
};


class ModelDesigner extends Component {
  state = {
    editLayer: undefined,
  };

  updateLayer = (layerIndex, newLayer) => {
    const { onChange } = this.props;
    const { model } = this.props;
    const updated = {
      ...model,
      layers: model.layers
        .map((l, index) => (index === layerIndex ? newLayer : l)),
    };
    onChange(updated);
  };

  onNeuronsChange = (event, layerIndex) => {
    const { model } = this.props;
    const layer = model.layers[layerIndex];
    const units = parseInt(event.target.value, 10);
    if (!Number.isNaN(units)) {
      const newLayer = { ...layer, config: { ...layer.config, units } };
      this.updateLayer(layerIndex, newLayer);
    }
  };

  onLayerClick = (index) => {
    this.setState({ editLayer: index });
  };

  onDeleteLayer = () => {
    const { onChange, model } = this.props;
    const { removeLayer } = this.state;
    const updated = {
      ...model,
      layers: model.layers
        .filter((_, index) => (index !== removeLayer)),
    };
    onChange(updated);
    this.setState({ removeLayer: undefined });
  };

  onDiscardDelete = () => {
    this.setState({ removeLayer: undefined });
  };
  onChange = (name, value) => {
    const { onChange, model } = this.props;
    onChange({
      ...model,
      [name]: value,
    });
  };
  onOptimizerChange = (name, value) => {
    const { onChange, model } = this.props;
    onChange({
      ...model,
      optimizer: { ...model.optimizer, ...value },
    });
  };

  onMoveLayerUp = (index) => {
    const { onChange, model } = this.props;
    const updated = {
      ...model,
      layers: moveArrayItem(model.layers, index, 'up'),
    };
    onChange(updated);
  };

  onMoveLayerDown = (index) => {
    const { onChange, model } = this.props;
    const updated = {
      ...model,
      layers: moveArrayItem(model.layers, index, 'down'),
    };
    onChange(updated);
  };

  onAddLayerClick = () => {
    this.setState({ editLayer: -1 });
  };


  onRequestForCloseEditLayer = () => {
    this.setState({ editLayer: undefined });
  };

  onSaveLayer = (layer) => {
    const { editLayer } = this.state;
    if (editLayer >= 0) {
      const oldLayer = this.props.model.layers[editLayer];
      this.updateLayer(editLayer, { ...oldLayer, ...layer });
    } else {
      const { model, onChange } = this.props;
      const updated = {
        ...model,
        layers: [...model.layers, layer],
      };
      onChange(updated);
    }
    this.setState({ editLayer: undefined });
  };

  renderLayerSettings(label, editable, layerIndex) {
    const { model } = this.props;
    const title = (
      <Text truncate={true} size='large' weight='bold' pad='small'>
        {label}
      </Text>
    );
    if (editable && layerIndex >= 0 && layerIndex < model.layers.length) {
      const actions = [
        {
          label: 'Edit',
          onClick: () => this.onLayerClick(layerIndex),
        },
        {
          label: 'Remove',
          onClick: () => this.setState({ removeLayer: layerIndex }),
        }];
      if (layerIndex > 0) {
        actions.push({
          label: 'Move Up',
          onClick: () => this.onMoveLayerUp(layerIndex),
        });
      }
      if (layerIndex < model.layers.length - 1) {
        actions.push({
          label: 'Move Down',
          onClick: () => this.onMoveLayerDown(layerIndex),
        });
      }
      return (
        <Box>
          <Box
            colorIndex='neutral-1'
            direction='row'
            justify='between'
          >
            <Menu
              icon={<SettingsOption />}
              label={title}
              dropAlign={{ top: 'top', left: 'left' }}
              a11yTitle='Layer'
              items={actions}
            />
          </Box>
          <FormField >
            <NumberInput
              min={1}
              max={20}
              value={model.layers[layerIndex].config.units}
              onChange={e => this.onNeuronsChange(e, layerIndex)}
            />
          </FormField>
        </Box>
      );
    }
    return title;
  }

  onChangeFeatures = (features) => {
    const { onChange, model } = this.props;
    onChange({ ...model, features });
  };
  onChangeTargets = (targets) => {
    const { onChange, model } = this.props;
    onChange({ ...model, targets });
  };

  renderLayer({ layer, index, nodes }) {
    const { readOnly } = this.props;
    return (
      <Box key={`layer_${index}`} direction='row' align='center' gap='medium' full='horizontal'>
        <Box basis='small' flex={false} >
          <Box basis='xsmall'>
            {
              this.renderLayerSettings(layer.config.name,
              !readOnly && layer.readOnly === undefined, index)
            }
          </Box>

        </Box>
        <Nodes index={index} nodes={nodes} background={layer.config.background} />
      </Box>
    );
  }

  render() {
    const { readOnly, model } = this.props;
    let editLayer;
    if (!readOnly && this.state.editLayer !== undefined) {
      let layer;
      if (this.state.editLayer >= 0) {
        layer = model.layers[this.state.editLayer];
      } else {
        const { targets } = model;
        layer = {
          type: 'Layer',
          name: 'layer',
          config: {
            type: 'Dense',
            name: 'Dense',
            background: '#07c66c',
            units: Math.max(targets.length, 1),
            // activityRegularizer: { type: 'Regularizer', config: { type: 'L1', l1: 0.3 } },
          },
        };
      }
      editLayer = (
        <EditLayer
          layer={layer}
          onClose={this.onRequestForCloseEditLayer}
          onSave={this.onSaveLayer}
        />
      );
    }
    let deleteConfirm;
    if (!readOnly && this.state.removeLayer !== undefined) {
      const layer = model.layers[this.state.removeLayer];
      deleteConfirm = (
        <Confirmation
          title='Remove layer?'
          text={`Are you sure you want to remove this ${layer.displayName} layer?`}
          onClose={this.onDiscardDelete}
          onConfirm={this.onDeleteLayer}
        />
      );
    }
    const layers = [];
    const { layers: deepLayers } = model;
    const layerNodes = deepLayers.map((layer, index) => {
      layers.push(layer);
      return this.renderLayer({
        layer,
        index,
        nodes: new Array(layer.config.units).fill()
          .map((_, i) => ({ label: `${layer.config.name}-${i + 1}` })),
      });
    });
    let connections = [];
    if (deepLayers.length > 0) {
      connections = [...connections, ...layerConnections('features', model.features, 0, deepLayers[0])];
      for (let i = 0; i < deepLayers.length - 1; i += 1) {
        connections = [...connections,
          ...layerConnections(i, deepLayers[i], i + 1, deepLayers[i + 1])];
      }
      connections = [...connections,
        ...layerConnections(deepLayers.length - 1, deepLayers[deepLayers.length - 1], 'targets', model.targets)];
    }
    let addButton;
    if (!readOnly) {
      addButton = (
        <Box>
          <Button
            label='+add layer'
            primary={true}
            onClick={this.onAddLayerClick}
          />
        </Box>
      );
    }
    const modelMap = (
      <Box pad='medium' direction='column'>
        <Box direction='row' fill='horizontal' align='center' justify='between' pad={{ bottom: 'medium' }}>
          <Heading level={3}>Network topology</Heading>
          {addButton}
        </Box>
        <Stack>
          <Box fill='horizontal' gap='large'>
            <Features features={model.features} onChange={this.onChangeFeatures} />
            {layerNodes}
            <Targets targets={model.targets} onChange={this.onChangeTargets} />
          </Box>
          <Diagram
            style={{ pointerEvents: 'none' }}
            connections={connections}
            calcPoints={calcDiagramEdgePoints}
          />
        </Stack>
      </Box>
    );
    let editTarget;
    if (this.state.editTarget !== undefined) {
      const target = model.targets[this.state.editTarget];
      editTarget = (
        <SelectDataset
          data={target}
          heading='Update target'
          onSelect={this.onUpdateTarget}
          onClose={() => this.setState({ editTarget: undefined })}
        />);
    }
    return (
      <Box flex={true} fill='true'>
        <TrainModel model={model} />
        <Box direction='row-responsive'>
          <Box basis='1/3' pad='medium'>
            <Heading level={3}>Parameters</Heading>
            <Box>
              <FormField label='Lookback (lag) days' htmlFor='lookback_days'>
                <NumberInput
                  id='lookback_days'
                  min={1}
                  max={300}
                  name='lookback_days'
                  value={model.lookbackDays}
                  onChange={({ target: { value } }) => this.onChange('lookbackDays', value)}
                />
              </FormField>
              <FormField label='Data points' htmlFor='data_points'>
                <NumberInput
                  id='data_points'
                  min={10}
                  max={1000}
                  step={1}
                  name='data_points'
                  value={model.dataPoints}
                  onChange={({ target: { value } }) => this.onChange('dataPoints', value)}
                />
              </FormField>
              <FormField label='Test/train split' htmlFor='test_split'>
                <NumberInput
                  id='test_split'
                  min={0}
                  max={1}
                  step={0.01}
                  name='test_split'
                  value={model.testSplit}
                  onChange={({ target: { value } }) => this.onChange('testSplit', value)}
                />
              </FormField>
              <FormField label='Batch size' htmlFor='batch_size'>
                <NumberInput
                  id='batch_size'
                  min={1}
                  max={30}
                  name='batch_size'
                  value={model.batchSize}
                  onChange={({ target: { value } }) => this.onChange('batchSize', value)}
                />
              </FormField>
              <FormField label='Epochs' htmlFor='epochs'>
                <NumberInput
                  id='epochs'
                  min={1}
                  max={100}
                  name='epochs'
                  value={model.epochs}
                  onChange={({ target: { value } }) => this.onChange('epochs', value)}
                />
              </FormField>
              <ComposedEditor
                value={model.optimizer}
                onChange={this.onOptimizerChange}
              />
            </Box>
          </Box>
          {modelMap}
          {editLayer}
          {deleteConfirm}
          {editTarget}
        </Box>
      </Box>
    );
  }
}

ModelDesigner.defaultProps = {
  readOnly: false,
};
ModelDesigner.propTypes = {
  readOnly: PropTypes.bool,
  model: PropTypes.object.isRequired,
};


export default ModelDesigner;

