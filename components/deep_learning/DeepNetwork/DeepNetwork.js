/**
 * Created by atanasster on 7/11/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, Menu, Stack, FormField, Button } from 'grommet';
import { SettingsOption } from 'grommet-icons';
import { NumberInput, Tag } from 'grommet-controls';
import { CoinGQL } from '../../coins/Coin';
import Diagram from '../../grommet/Diagram/Diagram';
import { createLayer } from '../keras-defaults';
import EditLayer from './EditLayer';
import Confirmation from '../../grommet-controls/Confirmation/Confirmation';

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

const nodeName = (layerIndex, nodeIndex) => (`node_${layerIndex}_${nodeIndex}`);

const layerConnections = (layers, index) => {
  const connections = [];

  if (index < layers.length - 1) {
    const fromLayer = layers[index];
    const toLayer = layers[index + 1];
    for (let from = 0; from < fromLayer.config.units; from += 1) {
      for (let to = 0; to < toLayer.config.units; to += 1) {
        connections.push({
          fromTarget: nodeName(index, from),
          toTarget: nodeName(index + 1, to),
          color: 'dark-5',
          thickness: '2',
          round: true,
          type: 'curved',
        });
      }
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

const Nodes = ({ index, nodes, ...rest }) => (
  <Box align='center' fill={true}>
    <Box basis='xsmall' direction='row' gap='small' >
      {nodes.map((node, nodeIndex) => (
        <Box
          id={nodeName(index, nodeIndex)}
          key={`${node.label}_${nodeIndex}`}
          style={{ width: '94px', height: '94px' }}
          border={{ side: 'all' }}
          round='full'
          align='center'
          justify='center'
          {...rest}
        >
          {typeof node.label === 'string' ? (
            <Text weight='bold'>{node.label}</Text>
            ) : node.label
            }
        </Box>
        ))}
    </Box>
  </Box>
);

class NetworkMap extends Component {
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
    const newLayer = { ...layer, config: { ...layer.config, units } };

    this.updateLayer(layerIndex, newLayer);
  }

  onLayerClick = (index) => {
    this.setState({ editLayer: index });
  }

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

  onRemoveFeature = (index) => {
    const { onChange, model } = this.props;
    if (model.features.length > 1) {
      const updated = { ...model, features: model.features.filter((_, i) => i !== index) };
      onChange(updated);
    }
  };

  onRemoveTarget = (index) => {
    const { onChange, model } = this.props;
    if (model.targets.length > 1) {
      const updated = { ...model, targets: model.targets.filter((_, i) => i !== index) };
      onChange(updated);
    }
  };

  onDiscardDelete = () => {
    this.setState({ removeLayer: undefined });
  };

  onMoveLayerUp = (index) => {
    const { onChange } = this.props;
    const { model } = this.props;
    const updated = {
      ...model,
      layers: moveArrayItem(model.layers, index, 'up'),
    };
    onChange(updated);
  };

  onMoveLayerDown = (index) => {
    const { onChange } = this.props;
    const { model } = this.props;
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
      this.updateLayer(editLayer, { ...oldLayer, config: layer });
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
              max={8}
              value={model.layers[layerIndex].config.units}
              onChange={e => this.onNeuronsChange(e, layerIndex)}
            />
          </FormField>
        </Box>
      );
    }
    return title;
  }

  renderLayer({ layer, nodes }) {
    const { editable } = this.props;
    return (
      <Box key={`layer_${layer.index}`} direction='row' align='center' gap='medium' full='horizontal'>
        <Box basis='small' flex={false} >
          <Box basis='xsmall'>
            {
              this.renderLayerSettings(layer.slug || layer.className,
              editable && layer.readOnly === undefined, layer.index - 1)
            }
          </Box>

        </Box>
        <Nodes index={layer.index} nodes={nodes} background={layer.background} />
      </Box>
    );
  }

  render() {
    const { editable, model, kerasDefaults } = this.props;
    let editLayer;
    if (editable && this.state.editLayer !== undefined) {
      let layer;
      if (this.state.editLayer >= 0) {
        layer = model.layers[this.state.editLayer];
      } else {
        const { targets } = model;
        layer = createLayer(kerasDefaults.layers, 'Dense', { units: Math.max(targets.length, 1) });
      }
      editLayer = (
        <EditLayer
          layer={layer}
          onClose={this.onRequestForCloseEditLayer}
          onSave={this.onSaveLayer}
          kerasDefaults={kerasDefaults}
        />
      );
    }
    let deleteConfirm;
    if (editable && this.state.removeLayer !== undefined) {
      const layer = model.layers[this.state.removeLayer];
      deleteConfirm = (
        <Confirmation
          title='Remove layer?'
          text={`Are you sure you want to remove this ${layer.className} layer?`}
          onClose={this.onDiscardDelete}
          onConfirm={this.onDeleteLayer}
        />
      );
    }
    const layers = [];
    const layerFeatures = {
      className: 'Features',
      background: '#FFCA58',
      index: 0,
      readOnly: true,
      config: {
        units: model.features.length,
      },
    };
    layers.push(layerFeatures);

    const featureNodes = this.renderLayer({
      layer: layerFeatures,
      nodes: model.features.map((item, index) => ({
        label: (
          <Box align='center'>
            <CoinGQL symbol={item.symbol} display={['image']} />
            <Tag
              background='transparent'
              label={item.fieldName}
              round='medium'
              onChange={model.features.length > 1 ? () => this.onRemoveFeature(index) : undefined}
            />
          </Box>
        ),
      })),
    });

    const { layers: deepLayers } = model;
    const layerNodes = deepLayers.map((layer, index) => {
      layers.push(layer);
      return this.renderLayer({
        layer: {
          ...layer,
          background: ['LSTM', 'GRU', 'SimpleRNN'].indexOf(layer.className) !== -1 ? '#0072c6' : '#07c66c',
          index: index + 1,
        },
        nodes: new Array(layer.config.units).fill()
          .map((_, i) => ({ label: `${layer.slug}-${i + 1}` })),
      });
    });
    const layerTargets = {
      className: 'Target',
      background: '#ff990a',
      index: layers.length,
      readOnly: true,
      config: {
        units: model.targets.length,
      },
    };
    layers.push(layerTargets);
    const targetsNodes = this.renderLayer({
      layer: layerTargets,
      nodes: model.targets.map((item, index) => ({
        label: (
          <Box align='center'>
            <CoinGQL symbol={item.symbol} display={['image']} />
            <Tag
              background='transparent'
              label={<Text weight='bold'>{item.fieldName}</Text>}
              round='medium'
              onChange={model.targets.length > 1 ? () => this.onRemoveTarget(index) : undefined}
            />
          </Box>
        ),
      })),
    });
    let connections = [];
    for (let i = 0; i < layers.length - 1; i += 1) {
      connections = [...connections, ...layerConnections(layers, i)];
    }
    let addButton;
    if (editable) {
      addButton = (
        <Box align='end'>
          <Button
            label='+Add layer'
            primary={true}
            onClick={this.onAddLayerClick}
          />
        </Box>
      );
    }
    const modelMap = (
      <Box pad='medium' direction='column'>
        {addButton}
        <Heading level={3}>Network topology</Heading>
        <Stack>
          <Box fill='horizontal' gap='large'>
            {featureNodes}
            {layerNodes}
            {targetsNodes}
          </Box>
          <Diagram
            style={{ pointerEvents: 'none' }}
            connections={connections}
            calcPoints={calcDiagramEdgePoints}
          />
        </Stack>
      </Box>
    );
    return (
      <Box flex={true} full='true'>
        {modelMap}
        {editLayer}
        {deleteConfirm}
      </Box>
    );
  }
}

NetworkMap.defaultProps = {
  editable: true,
};
NetworkMap.propTypes = {
  editable: PropTypes.bool,
  model: PropTypes.object.isRequired,
};


export default NetworkMap;

