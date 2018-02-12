import React, { Component } from 'react';
import { Box } from 'grommet';
import CoinPage from '../../components/pages/CoinPage';
import PriceCard from '../../components/cards/PriceCard';
import PriceChart from '../../components/PriceChart';
import OrderBookCard from '../../components/cards/OrderBookCard';


export default class CoinInfo extends Component {
  render() {
    const { symbol, toSymbol, exchange } = this.props.match.params;
    return (
      <CoinPage symbol={symbol} toSymbol={toSymbol} exchange={exchange}>
        <Box direction='row' full='horizontal' border='bottom' pad={{ vertical: 'small' }}>
          <Box basis='1/3'>
            <PriceCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
          </Box>
          <Box basis='1/3'>
            <PriceCard symbol={symbol} toSymbol={toSymbol} exchange='CCCAGG' />
          </Box>
          <Box basis='1/3'>
            <OrderBookCard symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
          </Box>
        </Box>
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
