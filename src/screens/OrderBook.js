import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import {
  Box,
  Text,
} from 'grommet';
import Page from '../components/Page';
import CardScroll from '../components/CardScroll';
import Table from '../components/table/Table';
import Exchange from '../components/Exchange';
import { requestOrderBook } from '../actions/order_book/actions';

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

class OrderBook extends Component {
  requestOrderBook(props) {
    this.props.requestOrderBook(props.match.params.symbol, props.match.params.toSymbol);
  }
  componentDidMount() {
    this.requestOrderBook(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.symbol !== this.props.match.params.symbol ||
        nextProps.match.params.toSymbol !== this.props.match.params.toSymbol
    ) {
      this.requestOrderBook(nextProps);
    }
  }

  renderOrderBook() {
    const { orderBook, exchanges } = this.props;

    return orderBook.sort((a, b) => {
      const aAsks = a.orderBook.asks;
      const bAsks = b.orderBook.asks;
      if (aAsks.length === 0 || bAsks.length === 0) {
        return bAsks.length - aAsks.length;
      }
      return aAsks[0][0] - bAsks[0][0];
    }).map((item) => {
      const exchange = exchanges.find(e => e.id === item.exchange);
      if (!exchange) {
        return null;
      }
      let book = 'N/A';
      if (item.orderBook) {
        book = (
          <Box>
            <Text textAlign='center'>{moment(item.orderBook.timestamp).format('LLL')}</Text>
            <Box direction='row' pad=' small'>
              <Box basis='1/2' align='center'>
                <Text size='medium'>Bid</Text>
                {renderAskBidTable(item.orderBook.bids, 'bids')}
              </Box>
              <Box basis='1/2' align='center'>
                <Text size='medium'>Ask</Text>
                {renderAskBidTable(item.orderBook.asks, 'asks')}
              </Box>
            </Box>
          </Box>
        );
      }
      return (
        <Box key={`order_${item.exchange}`} align='center' margin={{ vertical: 'small' }} pad={{ horizontal: 'small' }} border='all'>
          <Exchange exchange={exchange} />
          <Text size='large'>{item.symbol}</Text>
          {book}
        </Box>
      );
    });
  }
  render() {
    const { match: { params: { symbol, toSymbol } } } = this.props;
    return (
      <Page name={`${symbol}/${toSymbol}`} >
        <CardScroll >
          {this.renderOrderBook()}
        </CardScroll>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ requestOrderBook }, dispatch);

const mapStateToProps = state =>
  ({
    orderBook: state.orderBook,
    exchanges: state.exchanges.all,
  });

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);
