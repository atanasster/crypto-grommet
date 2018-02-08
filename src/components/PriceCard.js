import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { Box, Heading, Text, Chart, Image, RoutedAnchor, Menu } from 'grommet';
import { getPriceHistory } from '../actions/price_history/actions';
import { subscribeLastPrices, unSubscribeLastPrices } from '../actions/price_stream/actions';
import * as ActionTypes from '../actions/price_stream/constants';
import Table from './table/Table';


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
    this.state = { period: props.period, points: props.points };
  }

  requestPriceHistory(period, points) {
    const { symbol, toSymbol, exchange } = this.props;
    this.props.getPriceHistory(symbol, toSymbol, exchange, period, points);
  }


  componentDidMount() {
    const { symbol, toSymbol, exchange, period, points } = this.props;
    this.props.subscribeLastPrices({ symbol, toSymbol, exchange });
    this.requestPriceHistory(period, points);
  }

  componentWillUnmount() {
    const { symbol, toSymbol, exchange } = this.props;
    this.props.unSubscribeLastPrices({ symbol, toSymbol, exchange });
  }

  renderLastPrice() {
    const { priceStream } = this.props;
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
      return (
        <Box align='center'>
          <Box border='bottom' margin='small'>
            <Text size='xlarge' color={priceColor} margin='medium'>
              <strong>{numeral(data.PRICE).format('$0,0.00')}</strong>
            </Text>
          </Box>
          <Table>
            <tbody>
              <tr>
                <td>24hr change</td>
                <td>
                  <Box direction='row'>
                    <Text color={valueToColor(change24h)}>
                      <strong>{numeral(change24h).format('$0,0.00')}</strong>
                    </Text>
                    {' / '}
                    <Text color={valueToColor(pctChange24h)}>
                      <strong>{numeral(pctChange24h).format('0.00%')}</strong>
                    </Text>
                  </Box>
                </td>
              </tr>
              <tr>
                <td>24hr open</td>
                <td>{numeral(data.OPEN24HOUR).format('$0,0.00')}</td>
              </tr>
              <tr>
                <td>24hr high</td>
                <td>{numeral(data.HIGH24HOUR).format('$0,0.00')}</td>
              </tr>
              <tr>
                <td>24hr low</td>
                <td>{numeral(data.LOW24HOUR).format('$0,0.00')}</td>
              </tr>
              <tr>
                <td>Last exchange</td>
                <td><strong>{data.LASTMARKET}</strong></td>
              </tr>
              <tr>
                <td>Last trade volume</td>
                <td>{numeral(data.LASTVOLUME).format('0,0.00000000')}</td>
              </tr>
              <tr>
                <td>Last trade value</td>
                <td>{numeral(data.LASTVOLUMETO).format('$0,0.00')}</td>
              </tr>
              <tr>
                <td>Day volume</td>
                <td>{numeral(data.VOLUME24HOUR).format('0,0.00000000')}</td>
              </tr>
              <tr>
                <td>Day value</td>
                <td>{numeral(data.VOLUME24HOURTO).format('$0,0.00')}</td>
              </tr>

            </tbody>
          </Table>
        </Box>
      );
    }
    return null;
  }

  onSelectPeriod = (item) => {
    this.requestPriceHistory(item.value, this.state.points);
    this.setState({ period: item.value });
  }

  onSelectPoints = (item) => {
    this.requestPriceHistory(this.state.period, item.value);
    this.setState({ points: item.value });
  }
  render() {
    const { symbol, toSymbol, exchange, color, coin, priceHistory } = this.props;
    const { period, points } = this.state;
    return (
      <Box pad='small' margin='small' border='all' align='center'>
        <Box border='bottom' direction='row' align='center'>
          {coin ? <Box margin='small'><Image src={coin.imageUrl} style={{ width: '34px', height: '34px' }} /></Box> : null}
          <RoutedAnchor path={`/order_book/${symbol}/${toSymbol}`}>
            <Heading level={2} margin='none'>{coin ? coin.fullName : symbol}</Heading>
          </RoutedAnchor>
        </Box>
        <Box margin='small'>
          <Text>{exchange}</Text>
        </Box>
        <Box pad='small'>
          <Box border='horizontal'>
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
                  { ...item, onClick: () => this.onSelectPoints(item) }
                ))}
                label={optionLimit.find(p => (p.value === points)).label}
              />
            </Box>
            <Chart
              thickness='xsmall'
              type='line'
              color={color}
              values={priceHistory ? priceHistory.data.map((price, index) => ({
                value: [index, price.close],
                label: moment(price.time)
                  .format('LLL'),
              })) : []}
            />
          </Box>
          {this.renderLastPrice()}
        </Box>
      </Box>
    );
  }
}

PriceCard.defaultProps = {
  color: undefined,
};

PriceCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  color: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  { subscribeLastPrices, unSubscribeLastPrices, getPriceHistory }, dispatch);

const mapStateToProps = (state, props) => ({
  priceStream: state.priceStream[ActionTypes.actionToKey(props)],
  priceHistory: state.priceHistory[ActionTypes.actionToKey(props)],
  coin: state.coins.all.find(c => (c.symbol === props.symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceCard);
