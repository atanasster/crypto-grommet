import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box } from 'grommet';
import { requestAllOrderBooks } from '../actions/order_book/actions';
import CoinPage from '../components/CoinPage';
import PriceCard from '../components/PriceCard';
import PriceChart from '../components/PriceChart';
import OrderBookCard from '../components/OrderBookCard';


class CoinInfo extends Component {
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

const mapDispatchToProps = dispatch => bindActionCreators({ requestAllOrderBooks }, dispatch);

const mapStateToProps = state =>
  ({
    orderBook: state.orderBook,
    exchanges: state.exchanges.all,
  });

export default connect(mapStateToProps, mapDispatchToProps)(CoinInfo);
