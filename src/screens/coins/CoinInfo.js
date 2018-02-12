import React, { Component } from 'react';
import { Box } from 'grommet';
import CoinPage from '../../components/pages/CoinPage';
import PriceCard from '../../components/cards/PriceCard';
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
      </CoinPage>
    );
  }
}
