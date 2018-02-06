import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Chart } from 'grommet';

export default class PriceChart extends Component {
  render() {
    const { symbol } = this.props;
    return (
      <Box margin={{ bottom: 'xsmall' }} pad='xsmall' align='center'>
        <Chart
          thickness='xsmall'
          type='line'
          values={[
  { value: [7, 100], label: 'one hundred' },
  { value: [6, 70], label: 'seventy' },
  { value: [5, 60], label: 'sixty' },
  { value: [4, 80], label: 'eighty' },
  { value: [3, 40], label: 'forty' },
  { value: [2, 0], label: 'zero' },
  { value: [1, 25], label: 'thirty' },
  { value: [0, 60], label: 'sixty' },
]}
        />
        {symbol}
      </Box>
    );
  }
}

PriceChart.propTypes = {
  symbol: PropTypes.string.isRequired,
};
