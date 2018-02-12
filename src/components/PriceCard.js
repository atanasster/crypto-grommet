import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { Box, Heading, Text, Chart, Image, RoutedAnchor, Menu, Layer, Button } from 'grommet';
import { Close } from 'grommet-icons';
import requestPriceHistory from '../actions/price_history/actions';
import { subscribeLastPrices, unSubscribeLastPrices } from '../actions/price_stream/actions';
import * as ActionTypes from '../actions/price_stream/constants';
import PriceChart from './PriceChart';
import Table from './table/Table';
import { FormattedCoinValue } from './Coin';

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

  requestPriceHistory(period, points, props) {
    const { symbol, toSymbol, exchange } = props;
    this.props.requestPriceHistory({ symbol, toSymbol, exchange, period, points });
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
    const { priceStream, exchanges, toSymbol } = this.props;

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
      const exchange = exchanges[data.LASTMARKET];
      const change24h = data.PRICE - data.OPEN24HOUR;
      const pctChange24h = change24h / data.OPEN24HOUR;
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
          <Table>
            <tbody>
              <tr>
                <td>24hr change</td>
                <td>
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
                </td>
              </tr>
              <tr>
                <td>24hr open</td>
                <td>
                  <FormattedCoinValue
                    value={data.OPEN24HOUR}
                    toSymbol={toSymbol}
                  />
                </td>
              </tr>
              <tr>
                <td>24hr high</td>
                <td>
                  <FormattedCoinValue
                    value={data.HIGH24HOUR}
                    toSymbol={toSymbol}
                  />
                </td>
              </tr>
              <tr>
                <td>24hr low</td>
                <td>
                  <FormattedCoinValue
                    value={data.LOW24HOUR}
                    toSymbol={toSymbol}
                  />
                </td>
              </tr>
              {data.LASTMARKET ? (
                <tr>
                  <td>Last exchange</td>
                  <td>
                    <RoutedAnchor path={`/exchanges/${data.LASTMARKET}`}>
                      <Box align='center' direction='row' justify='between'>
                        {exchange ? (
                          <Image
                            src={exchange.logo}
                            style={{ height: '24px' }}
                          />)
                          : null
                        }
                        <strong>{data.LASTMARKET}</strong>
                      </Box>
                    </RoutedAnchor>
                  </td>
                </tr>
              ) : null
              }
              <tr>
                <td>Last trade volume</td>
                <td>{numeral(data.LASTVOLUME).format('0,0.00000000')}</td>
              </tr>
              <tr>
                <td>Last trade value</td>
                <td>
                  <FormattedCoinValue
                    value={data.LASTVOLUMETO}
                    toSymbol={toSymbol}
                  />
                </td>
              </tr>
              <tr>
                <td>24hr volume</td>
                <td>{numeral(data.VOLUME24HOUR).format('0,0')}</td>
              </tr>
              <tr>
                <td>24hr value</td>
                <td>
                  <FormattedCoinValue
                    value={data.VOLUME24HOURTO}
                    toSymbol={toSymbol}
                  />
                </td>
              </tr>

            </tbody>
          </Table>
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

  onClick = (e) => {
    e.preventDefault();
    this.setState({ chart: true });
  }
  render() {
    const { symbol, toSymbol, exchange, color, coin, priceHistory, defaultExchange } = this.props;
    const { period, points, chart } = this.state;
    let imageLayer;
    if (chart) {
      const closeLayer = () => this.setState({ chart: undefined });
      imageLayer = (
        <Layer onEsc={closeLayer} plain={true}>
          <Box full={true} background={{ color: 'black', opacity: 'weak' }}>
            <Box align='end' pad='medium'>
              <Button icon={<Close size='large' color='white' />} onClick={closeLayer} />
            </Box>
            <Box margin='medium' basis='xlarge'>
              <PriceChart
                symbol={symbol}
                toSymbol={toSymbol}
                exchange={exchange}
                period={period}
                points={points}
              />
            </Box>
          </Box>
        </Layer>
      );
    }
    const exchangeName = exchange === 'CCCAGG' ? defaultExchange : exchange;
    return (
      <Box pad='small' margin='small' border='all' align='center'>
        <Box border='bottom' direction='row' align='center'>
          {coin ? <Box margin='small'><Image src={coin.imageUrl} style={{ width: '34px', height: '34px' }} /></Box> : null}
          <RoutedAnchor path={`/coins/info/${symbol}/${toSymbol}/${exchangeName}`}>
            <Heading level={2} margin='none'>{coin ? coin.fullName : symbol}</Heading>
          </RoutedAnchor>
        </Box>
        <Box margin='small'>
          <Text size='medium'><strong>{exchange}</strong></Text>
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
                  { value: item.value, label: `${item.value} ${period}s`, onClick: () => this.onSelectPoints(item) }
                ))}
                label={`${optionLimit.find(p => (p.value === points)).value} ${period}s`}
              />
            </Box>
            <Chart
              thickness='xsmall'
              onClick={this.onClick}
              type='line'
              color={color}
              style={{ cursor: 'pointer' }}
              values={priceHistory ? priceHistory.data.map((price, index) => ({
                value: [index, price.close],
                label: moment(price.time)
                  .format('LLL'),
              })) : []}
            />
          </Box>
          {this.renderLastPrice()}
        </Box>
        {imageLayer}
      </Box>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators(
  { subscribeLastPrices, unSubscribeLastPrices, requestPriceHistory }, dispatch);

const mapStateToProps = (state, props) => ({
  priceStream: state.priceStream[ActionTypes.actionToKey(props)],
  priceHistory: state.priceHistory[ActionTypes.actionToKey(props)],
  coin: state.coins.all[props.symbol],
  exchanges: state.exchanges.all,
  defaultExchange: state.settings.defaultExchange,
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
