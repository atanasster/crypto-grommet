import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Chart, Menu, RoutedButton } from 'grommet';
import { longDate } from '../../../components/utils/moment';
import requestPriceHistory from '../../../actions/price_history/actions';
import { actionToKey } from '../../../actions/api/api';
import Card from '../../../components/Card';
import Exchange from '../../exchanges/components/Exchange';
import { CoinToCoin } from '../../../components/Coin';
import PriceTableStream from './PriceTableStream';

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
    const { period, points } = this.props;
    this.requestPriceHistory(period, points, this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { symbol, toSymbol, exchange } = nextProps;
    const { period, points } = this.state;
    if (symbol !== this.props.symbol ||
        toSymbol !== this.props.toSymbol ||
        exchange !== this.props.exchange) {
      this.requestPriceHistory(period, points, nextProps);
    }
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
                  label: longDate(price.time),
                })) : []}
              />
            </RoutedButton>
          </Box>
          <PriceTableStream symbol={symbol} toSymbol={toSymbol} exchange={exchange} />
        </Box>
      </Card>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({ requestPriceHistory }, dispatch);

const mapStateToProps = (state, props) => {
  const toSymbol = props.toSymbol || state.settings.defaultCurrency;
  const exchange = props.exchange || state.settings.aggregatedExchange;
  const key = { symbol: props.symbol, exchange, toSymbol };
  return {
    priceHistory: state.priceHistory[actionToKey(key)],
    exchange,
    toSymbol,
  };
};

const ConnectedPriceCard = connect(mapStateToProps, mapDispatchToProps)(PriceCard);

ConnectedPriceCard.defaultProps = {
  color: undefined,
  period: 'day',
  points: 60,
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
