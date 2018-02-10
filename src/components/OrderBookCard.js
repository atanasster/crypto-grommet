import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { Box, Text } from 'grommet';
import requestOrderBook from '../actions/order_book/actions';
import Table from './table/Table';
import Card from './Card';
import * as ActionTypes from '../actions/price_stream/constants';

function renderAskBidTable(data, key) {
  const rows = data.slice(0, 10).map((item, index) => (
    <tr key={`${key}_table_${index}`}>
      <td>{numeral(item[0]).format('$0,0.00')}</td>
      <td>{numeral(item[1]).format('0,0.0000')}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>Price</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
}

class OrderBookCard extends Component {
  componentDidMount() {
    const { symbol, toSymbol, exchange } = this.props;
    this.props.requestOrderBook({ symbol, toSymbol, exchange });
  }


  render() {
    const { orderBook, symbol, exchange } = this.props;
    if (!orderBook) {
      return null;
    }
    const { data, realToSymbol } = orderBook;
    return (
      <Card
        title={`${symbol}/${realToSymbol}`}
        subTitle={exchange}
      >
        <Text>{moment(data.timestamp).format('LLL')}</Text>
        <Box direction='row' pad=' small'>
          <Box basis='1/2' align='center'>
            <Text size='medium'><strong>Bid</strong></Text>
            {renderAskBidTable(data.bids, 'bids')}
          </Box>
          <Box basis='1/2' align='center'>
            <Text size='medium'><strong>Ask</strong></Text>
            {renderAskBidTable(data.asks, 'asks')}
          </Box>
        </Box>
      </Card>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({ requestOrderBook }, dispatch);

const mapStateToProps = (state, props) => ({
  orderBook: state.orderBook.data[ActionTypes.actionToKey(props)],
});

OrderBookCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookCard);
