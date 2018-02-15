import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { Box, Text, Chart, Menu, RoutedButton } from 'grommet';
import requestPriceHistory from '../../actions/price_history/actions';
import { subscribeLastPrices, unSubscribeLastPrices } from '../../actions/price_stream/actions';
import * as ActionTypes from '../../actions/price_stream/constants';
import Card from './Card';
import Exchange from '../Exchange';
import Table from '../table/Table';
import { FormattedCoinValue, CoinToCoin } from '../Coin';

const optionDuration = [
  { label: 'Daily', value: 'day' },
  { label: 'Hourly', value: 'hour' },
  { label: 'Minutes', value: 'minute' },
];

const optionLimit = [
  { label: '60 points', value: 60 },
  { label: '100 points', value: 100 },
  { label: '500 points', value: 500 },
  { label: '1000 points', value: 1000 },
  { label: '2000 points', value: 2000 },
];

const valueToColor = (value) => {
  if (value > 0) {
    return 'status-ok';
    // eslint-disable-next-line no-bitwise
  } else if (value < 0) {
    return 'status-critical';
  }
  return 'status-warning';
};

class PriceCard extends Component {
  constructor(props) {
    super(props);
    this.state = { period: props.period, points: props.points, chart: false };
  }

  requestPriceHistory(period, limit, props) {
    const { symbol, toSymbol, exchange } = props;
    this.props.requestPriceHistory({ symbol, toSymbol, exchange, period, limit });
  }


  componentDidMount() {
    const { symbol, toSymbol, exchange, period, points } = this.props;
    this.props.subscribeLastPrices({ symbol, toSymbol, exchange });
    this.requestPriceHistory(period, points, this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { symbol, toSymbol, exchange } = nextProps;
    const { period, points } = this.state;
    if (symbol !== this.props.symbol ||
        toSymbol !== this.props.toSymbol ||
        exchange !== this.props.exchange) {
      this.props.unSubscribeLastPrices(this.props);
      this.props.subscribeLastPrices(nextProps);
      this.requestPriceHistory(period, points, nextProps);
    }
  }

  componentWillUnmount() {
    const { symbol, toSymbol, exchange } = this.props;
    this.props.unSubscribeLastPrices({ symbol, toSymbol, exchange });
  }

  renderLastPrice() {
    const { priceStream, toSymbol } = this.props;

    if (priceStream) {
      const { data } = priceStream;
      let priceColor;
      // eslint-disable-next-line no-bitwise
      if (data.FLAGS & 1) {
        priceColor = valueToColor(1);
      // eslint-disable-next-line no-bitwise
      } else if (data.FLAGS & 1) {
        priceColor = valueToColor(-1);
      } else {
        priceColor = valueToColor(0);
      }
      const change24h = data.PRICE - data.OPEN24HOUR;
      const pctChange24h = change24h / data.OPEN24HOUR;
      const rows = [
        {
          label: '24hr change',
          value: (
            <Box direction='row'>
              <Text color={valueToColor(change24h)}>
                <strong>
                  {numeral(change24h).format('0,0.00')}
                  <Text size='xsmall' >
                    {toSymbol}
                  </Text>
                </strong>
              </Text>
              {' / '}
              <Text color={valueToColor(pctChange24h)}>
                <strong>{numeral(pctChange24h).format('0.00%')}</strong>
              </Text>
            </Box>
          ),
        }, {
          label: '24hr open',
          value: <FormattedCoinValue value={data.OPEN24HOUR} toSymbol={toSymbol} />,
        }, {
          label: '24hr high',
          value: <FormattedCoinValue value={data.HIGH24HOUR} toSymbol={toSymbol} />,
        }, {
          label: '24hr low',
          value: <FormattedCoinValue value={data.LOW24HOUR} toSymbol={toSymbol} />,
        }, {
          label: 'Last exchange',
          value: <Exchange exchange={data.LASTMARKET} />,
        }, {
          label: 'Last trade volume',
          value: numeral(data.LASTVOLUME).format('0,0.00000000'),
        }, {
          label: 'Last trade value',
          value: <FormattedCoinValue value={data.LASTVOLUMETO} toSymbol={toSymbol} />,
        }, {
          label: '24hr volume',
          value: numeral(data.VOLUME24HOUR).format('0,0'),
        }, {
          label: '24hr value',
          value: <FormattedCoinValue value={data.VOLUME24HOURTO} toSymbol={toSymbol} />,
        },
      ];
      return (
        <Box align='center'>
          <Box border='bottom' margin='small' >
            <strong>
              <Text size='xlarge' color={priceColor} >
                {numeral(data.PRICE).format('0,0.00')}
              </Text>
              <Text size='xsmall' color={priceColor} >
                {toSymbol}
              </Text>
            </strong>
          </Box>
          <Table
            data={rows}
            columns={[
              { accessor: 'label' },
              { accessor: 'value' },
            ]}
          />
        </Box>
      );
    }
    return null;
  }

  onSelectPeriod = (item) => {
    this.requestPriceHistory(item.value, this.state.points, this.props);
    this.setState({ period: item.value });
  }

  onSelectPoints = (item) => {
    this.requestPriceHistory(this.state.period, item.value, this.props);
    this.setState({ points: item.value });
  }

  render() {
    const { symbol, toSymbol, exchange, color, priceHistory } = this.props;
    const { period, points } = this.state;
    return (
      <Card
        title={<CoinToCoin symbol={symbol} toSymbol={toSymbol} exchange={exchange} border='bottom' />}
        subTitle={<Exchange exchange={exchange} />}
      >
        <Box pad='small'>
          <Box border='bottom'>
            <Box justify='between' direction='row'>
              <Menu
                a11yTitle='Select period'
                items={optionDuration.filter(item => (item.value !== period)).map(item => (
                  { ...item, onClick: () => this.onSelectPeriod(item) }
                ))}
                label={optionDuration.find(p => (p.value === period)).label}
              />
              <Menu
                a11yTitle='Select data points'
                items={optionLimit.filter(item => (item.value !== points)).map(item => (
                  { value: item.value, label: `${item.value} ${period}s`, onClick: () => this.onSelectPoints(item) }
                ))}
                label={`${optionLimit.find(p => (p.value === points)).value} ${period}s`}
              />
            </Box>
            <RoutedButton path={`/coins/chart/${symbol}/${toSymbol}/${exchange}`}>
              <Chart
                thickness='xsmall'
                type='line'
                color={color}
                style={{ cursor: 'pointer' }}
                values={priceHistory ? priceHistory.data.map((price, index) => ({
                  value: [index, price.close],
                  label: moment(price.time)
                    .format('LLL'),
                })) : []}
              />
            </RoutedButton>
          </Box>
          {this.renderLastPrice()}
        </Box>
      </Card>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators(
  { subscribeLastPrices, unSubscribeLastPrices, requestPriceHistory }, dispatch);

const mapStateToProps = (state, props) => ({
  priceStream: state.priceStream[ActionTypes.actionToKey(props)],
  priceHistory: state.priceHistory[ActionTypes.actionToKey(props)],
});

const ConnectedPriceCard = connect(mapStateToProps, mapDispatchToProps)(PriceCard);

ConnectedPriceCard.defaultProps = {
  color: undefined,
  period: 'day',
  points: 60,
  exchange: 'CCCAGG',
  toSymbol: 'USD',
};

ConnectedPriceCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string,
  exchange: PropTypes.string,
  period: PropTypes.string,
  points: PropTypes.number,
  color: PropTypes.string,
};

export default ConnectedPriceCard;
