import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import * as tfvis from '@tensorflow/tfjs-vis';
import { Box } from 'grommet';

class LossHistoryChart extends React.Component {
  render() {
    const { loss, valLoss, width = '300px' } = this.props;
    return (
      <Box
        width={width}
        height='70px'
        ref={(r) => {
            const container = findDOMNode(r);
            if (container) {
              const logs = loss.map((l, i) => (
                {
                  loss: l,
                  val_loss: valLoss ? valLoss[i] : undefined,
                }
              ));
              tfvis.show.history(container, logs, ['loss', 'val_loss'],
              {
                width: container.offsetWidth,
                height: container.offsetHeight,
                yLabel: null,
                xLabel: null,
              });
            }
          }}
      />
    );
  }
}

LossHistoryChart.defaultProps = {
  loss: [],
  valLoss: [],
};

LossHistoryChart.propTypes = {
  loss: PropTypes.array,
  valLoss: PropTypes.array,
};

export default LossHistoryChart;
