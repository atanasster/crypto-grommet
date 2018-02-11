import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import moment from 'moment';
import { Box } from 'grommet';
import * as ActionTypes from '../actions/price_stream/constants';
import requestPriceHistory from '../actions/price_history/actions';

class PriceChart extends Component {
  componentDidMount() {
    const { symbol, toSymbol, exchange, period, points } = this.props;
    this.props.requestPriceHistory({ symbol, toSymbol, exchange, period, points });
  }

  renderChart() {
    const { priceHistory } = this.props;
    console.log(priceHistory);
    const { symbol, toSymbol } = this.props;
    const groupingUnits = [[
      'week',
      [1],
    ], [
      'month',
      [1, 2, 3, 4, 6],
    ]];
    const ohlc = priceHistory.data.map(item => (
      [moment.unix(item.time).valueOf(), item.open, item.high, item.low, item.close])
    );
    const volumeTo = priceHistory.data.map(item => (
      [moment.unix(item.time).valueOf(), item.volumeto]
    ));
    const volumeFrom = priceHistory.data.map(item => (
      [moment.unix(item.time).valueOf(), item.volumefrom]
    ));
    const config = {
      chart: {
        height: '500px',
      },
      credits: {
        enabled: false,
      },
      rangeSelector: {
        enabled: false,
        selected: 1,
      },
      title: {
        text: `${symbol}/${toSymbol} Historical`,
      },
      yAxis: [{
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'OHLC',
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      }, {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: `${toSymbol}`,
        },
        top: '65%',
        height: '20%',
        offset: 0,
        lineWidth: 2,
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: `${symbol}`,
        },
        top: '80%',
        height: '20%',
        offset: 0,
        lineWidth: 2,
      }],

      plotOptions: {
        candlestick: {
          color: 'red',
          upColor: 'green',
        },
      },
      series: [{
        type: 'candlestick',
        name: `${symbol}/${toSymbol}`,
        data: ohlc,
        dataGrouping: {
          units: groupingUnits,
        },
      }, {
        type: 'column',
        name: `Volume ${toSymbol}`,
        data: volumeTo,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits,
        },
      }, {
        type: 'column',
        name: `Volume ${symbol}`,
        data: volumeFrom,
        yAxis: 2,
        dataGrouping: {
          units: groupingUnits,
        },
      }],
    };
    return (
      <ReactHighstock
        config={config}
        domProps={{ style: { width: '100%' } }}
      />
    );
  }

  render() {
    const { priceHistory } = this.props;
    if (!priceHistory) {
      return null;
    }
    return (
      <Box basis='small' direction='row'>
        {this.renderChart()}
      </Box>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({ requestPriceHistory }, dispatch);

const mapStateToProps = (state, props) => ({
  priceHistory: state.priceHistory[ActionTypes.actionToKey(props)],
  coin: state.coins.all[props.symbol],
});


PriceChart.defaultProps = {
  period: undefined,
  points: undefined,
};

PriceChart.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
  period: PropTypes.string,
  points: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceChart);
