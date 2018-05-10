import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const nodeName = (layerIndex, nodeIndex) => (`node_${layerIndex}_${nodeIndex}`);

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

Nodes.propTypes = {
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  nodes: PropTypes.array.isRequired,
};
export default Nodes;
