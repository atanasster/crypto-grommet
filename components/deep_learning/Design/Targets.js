import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import Symbol from '../../Symbol';
import Nodes from './Nodes';
import SelectDataset from '../../datasets/SelectDataset';

class Targets extends React.Component {
  state = {
    editTarget: undefined,
  };

  onUpdateTarget = (newTarget) => {
    const { editTarget } = this.state;
    if (editTarget >= 0) {
      const { targets, onChange } = this.props;
      const updated = targets
        .map((target, index) =>
          (index === editTarget ? { ...target, ...newTarget } : target));
      onChange(updated);
    }
    this.setState({ editTarget: undefined });
  };
  render() {
    const { targets } = this.props;
    const nodes = targets.map((item, index) => ({
      label: (
        <Button onClick={() => this.setState({ editTarget: index })} >
          <Box align='center'>
            <Symbol {...item} />
            <Text weight='bold'>{item.field}</Text>
          </Box>
        </Button>
      ),
    }));
    let editTarget;
    if (this.state.editTarget !== undefined) {
      const target = targets[this.state.editTarget];
      editTarget = (
        <SelectDataset
          data={target}
          heading='Select target'
          onSelect={this.onUpdateTarget}
          onClose={() => this.setState({ editTarget: undefined })}
        />);
    }
    return (
      <div>
        <Box direction='row' align='center' gap='medium' full='horizontal'>
          <Box basis='small' flex={false} >
            <Box basis='xsmall' pad='small' border='bottom' justify='between'>
              <Text truncate={true} size='large' weight='bold' pad='small'>
                Target
              </Text>
            </Box>
          </Box>
          <Nodes index='targets' nodes={nodes} background='#ff990a' />
        </Box>
        {editTarget}
      </div>
    );
  }
}

Targets.propTypes = {
  targets: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Targets;
