import React, { Component } from 'react';
import { Box } from 'grommet';
import CoinPage from '../../components/pages/CoinPage';
import PriceChart from '../../components/PriceChart';


export default class CoinChartAnalysis extends Component {
  render() {
    const { symbol, toSymbol, exchange } = this.props.match.params;
    return (
      <CoinPage symbol={symbol} toSymbol={toSymbol} exchange={exchange}>
        <Box full='horizontal' basis='medium' margin={{ vertical: 'medium' }}>
          <PriceChart
            symbol={symbol}
            toSymbol={toSymbol}
            exchange={exchange}
            period='day'
            points={2000}
          />
        </Box>
      </CoinPage>
    );
  }
}
