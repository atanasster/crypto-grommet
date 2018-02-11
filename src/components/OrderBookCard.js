import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';
import numeral from 'numeral';
import { Box, Text } from 'grommet';
import requestOrderBook from '../actions/order_book/actions';
import Table from './table/Table';
import Card from './Card';
import Coin from './Coin';
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

  renderChart() {
    const { orderBook: { data } } = this.props;
    const { symbol, toSymbol } = this.props;
    const config = {
      chart: {
        type: 'area',
      },
      title: {
        text: moment(data.timestamp).format('LLL'),
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
      tooltip: {
        valueDecimals: 8,
        useHTML: true,
        headerFormat: '<small style="font-size: 12px;color:{series.color}"><strong>{series.name}</strong></small>.',
        pointFormat: `<table><tbody><tr><td>Sum ${symbol}</td><td style="text-align: right"><b>{point.y}</b></td></tr>` +
                      `<tr><td>Price ${toSymbol}</td><td style="text-align: right"><b>{point.x}</b></td></tr></tbody></table>`,
        crosshairs: [true, true],
      },
      yAxis: {
        visible: false,
      },
      xAxis: {
        allowDecimals: true,
        labels: {
          formatter() {
            return this.value;
          },
        },
      },
    };
    const asks = [];
    const bids = [];
    data.asks.slice(0, 30).reduce((total, item) => {
      const t = total + item[1];
      asks.push([item[0], t]);
      return t;
    }, 0);
    data.bids.slice(0, 30).reduce((total, item) => {
      const t = total + item[1];
      bids.push([item[0], t]);
      return t;
    }, 0);
    bids.reverse();
    return (
      <ReactHighcharts
        config={{ ...config,
          series: [
            { name: 'bid', step: true, data: bids, color: '#ff324d', fillOpacity: 0.3 },
            { name: 'ask', step: true, data: asks, color: '#8cc800', fillOpacity: 0.3 },
          ] }}
        domProps={{ style: { width: '100%' } }}
      />
    );
  }

  render() {
    const { orderBook, symbol, exchange, coin } = this.props;
    if (!orderBook) {
      return null;
    }
    const { data, realToSymbol } = orderBook;
    return (
      <Card
        title={<Coin coin={coin} symbol={symbol} toSymbol={realToSymbol} exchange={exchange} />}
        subTitle={exchange}
      >
        <Box basis='small' direction='row'>
          {this.renderChart()}
        </Box>
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
  coin: state.coins.all[props.symbol],
});

OrderBookCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBookCard);
