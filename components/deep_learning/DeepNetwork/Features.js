import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Anchor, Text } from 'grommet';
import Symbol from '../../Symbol';
import Nodes from './Nodes';
import SelectDataset from '../../datasets/SelectDataset';


class Features extends React.Component {
  state = {
    editFeature: undefined,
  };

  onRemoveFeature = () => {
    const { editFeature } = this.state;
    const { features, onChange } = this.props;
    const updated = features.filter((_, index) => (index !== editFeature));
    onChange(updated);
    this.setState({ editFeature: undefined });
  };

  onUpdateFeature = (newFeature) => {
    const { editFeature } = this.state;
    if (editFeature !== undefined) {
      const { features, onChange } = this.props;
      const updated = editFeature >= 0 ? features.map((feature, index) =>
        (index === editFeature ? { ...feature, ...newFeature } : feature)) :
        [...features, newFeature];
      onChange(updated);
    }
    this.setState({ editFeature: undefined });
  };
  render() {
    const { features } = this.props;
    const nodes = features.map((item, index) => ({
      label: (
        <Button onClick={() => this.setState({ editFeature: index })} >
          <Box align='center'>
            <Symbol {...item} />
            <Text weight='bold'>{item.field}</Text>
          </Box>
        </Button>
      ),
    }));
    let editLayer;
    const { editFeature } = this.state;
    if (editFeature !== undefined) {
      const feature = editFeature >= 0 ? features[editFeature] : {};
      editLayer = (
        <SelectDataset
          data={feature}
          heading='Select feature'
          onSelect={this.onUpdateFeature}
          onClose={() => this.setState({ editFeature: undefined })}
          onRemove={features.length > 1 && editFeature >= 0 ? this.onRemoveFeature : undefined}
        />);
    }
    return (
      <div>
        <Box direction='row' align='center' gap='medium' full='horizontal'>
          <Box basis='small' flex={false} >
            <Box basis='xsmall' pad='small' border='bottom' justify='between'>
              <Text truncate={true} size='large' weight='bold' pad='small'>
                Features
              </Text>
              <Anchor primary={true} label='Add' onClick={() => this.setState({ editFeature: -1 })} />
            </Box>
          </Box>
          <Nodes index='features' nodes={nodes} background='#FFCA58' />
        </Box>
        {editLayer}
      </div>
    );
  }
}

Features.propTypes = {
  features: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Features;
