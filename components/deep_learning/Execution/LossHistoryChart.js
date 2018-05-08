import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

class LossHistoryChart extends React.Component {
  render() {
    const { loss, valLoss } = this.props;
    const data = [];
    if (loss && loss.length > 0) {
      data.push({
        id: 'train',
        color: 'hsl(9, 70%, 50%)',
        data: loss.map((y, epoch) => ({ x: `Epoch ${epoch}`, y })),
      });
    }
    if (valLoss && valLoss.length === loss.length) {
      data.push({
        id: 'val.',
        color: 'hsl(220, 70%, 50%)',
        data: valLoss.map((y, epoch) => ({ x: `Epoch ${epoch}`, y })),
      });
    }
    return (
      <div style={{ width: '300px', height: '60px' }} >
        {data.length > 0 ? (
          <ResponsiveLine
            colors='d310'
            data={data}
            minY='auto'
            stacked={true}
            curve='natural'
            enableDots={true}
            dotSize={10}
            tooltipFormat={value => value.toFixed(3)}
            dotColor='inherit:darker(0.3)'
            dotBorderWidth={2}
            dotBorderColor='#ffffff'
            enableArea={loss.length > 5}
          />
        ) : null}
      </div>
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
