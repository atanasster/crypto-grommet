import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

class LossHistoryChart extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div style={{ width: '300px', height: '60px' }} >
        <ResponsiveLine
          data={[{
            id: 'loss',
            color: 'hsl(9, 70%, 50%)',
            data: history.map((loss, epoch) => ({ x: `Epoch ${epoch}`, y: loss })),
          }]}
          minY='auto'
          stacked={true}
          curve='natural'
          enableDots={true}
          dotSize={10}
          dotColor='inherit:darker(0.3)'
          dotBorderWidth={2}
          dotBorderColor='#ffffff'
          enableArea={history.length > 5}
        />
      </div>
    );
  }
}

LossHistoryChart.defaultProps = {
  history: [],
};

LossHistoryChart.propTypes = {
  history: PropTypes.array,
};


export default LossHistoryChart;
