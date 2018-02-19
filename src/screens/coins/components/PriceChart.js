import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import { Box } from 'grommet';
import { actionToKey } from '../../../actions/api/api';
import requestPriceHistory from '../../../actions/price_history/actions';

class PriceChart extends Component {
  componentDidMount() {
    const { symbol, toSymbol, exchange, period, points } = this.props;
    this.props.requestPriceHistory({ symbol, toSymbol, exchange, period, points });
  }

  renderChart() {
    const { priceHistory, symbol, toSymbol, exchange } = this.props;
    const groupingUnits = [[
      'week',
      [1],
    ], [
      'month',
      [1, 2, 3, 4, 6],
    ]];
    const ohlc = priceHistory.data.map(item => (
      [item.time * 1000, item.open, item.high, item.low, item.close])
    );
    const volumeTo = priceHistory.data.map(item => (
      [item.time * 1000, item.volumeto]
    ));
    const config = {
      chart: {
        height: '500px',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        shared: true,
      },
      rangeSelector: {
        enabled: false,
        selected: 1,
      },
      title: {
        text: `${symbol}/${toSymbol} Historical`,
      },
      subtitle: {
        text: exchange,
      },
      legend: {
        enabled: true,
      },
      yAxis: [{
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: `${symbol}/${toSymbol}`,
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
        height: '35%',
        offset: 0,
        lineWidth: 2,
      },
      ],
      plotOptions: {
        candlestick: {
          color: 'red',
          upColor: 'green',
        },
      },
      series: [{
        type: 'candlestick',
        name: `${symbol}/${toSymbol}`,
        id: 'ohlc',
        data: ohlc,
        dataGrouping: {
          units: groupingUnits,
        },
      }, {
        type: 'column',
        name: `Volume ${toSymbol}`,
        id: 'volume',
        data: volumeTo,
        yAxis: 1,
        color: 'black',
        dataGrouping: {
          units: groupingUnits,
        },
      },
      ],
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
  priceHistory: state.priceHistory[actionToKey(props)],
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
