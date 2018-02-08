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
  { label: 'Day', value: 'day' },
  { label: 'Hour', value: 'hour' },
  { label: 'Minute', value: 'minute' },
];

class PriceCard extends Component {
  constructor(props) {
    super(props);
    this.state = { period: props.period };
  }

  requestPriceHistory(period) {
    const { symbol, toSymbol, exchange } = this.props;
    this.props.getPriceHistory(symbol, toSymbol, exchange, period);
  }


  componentDidMount() {
    const { symbol, toSymbol, exchange, period } = this.props;
    this.props.subscribeLastPrices({ symbol, toSymbol, exchange });
    this.requestPriceHistory(period);
  }

  componentWillUnmount() {
    const { symbol, toSymbol, exchange } = this.props;
    this.props.unSubscribeLastPrices({ symbol, toSymbol, exchange });
  }

  renderLastPrice() {
    const { priceStream } = this.props;
    if (priceStream) {
      const { data } = priceStream;
      let priceColor = 'status-warning';
      // eslint-disable-next-line no-bitwise
      if (data.FLAGS & 1) {
        priceColor = 'status-ok';
      // eslint-disable-next-line no-bitwise
      } else if (data.FLAGS & 1) {
        priceColor = 'status-critical';
      }
      const change24h = data.PRICE - data.OPEN24HOUR;
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
                <td>Day change</td>
                <td>{numeral(change24h).format('$0,0.00')} / {numeral(change24h / data.OPEN24HOUR).format('0.00%')}</td>
              </tr>
              <tr>
                <td>Day high</td>
                <td>{numeral(data.HIGH24HOUR).format('$0,0.00')}</td>
              </tr>
              <tr>
                <td>Day low</td>
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

  onSelectPeriod = (period) => {
    this.requestPriceHistory(period.value);
    this.setState({ period: period.value });
  }

  render() {
    const { symbol, toSymbol, exchange, color, coin, priceHistory } = this.props;
    const { period } = this.state;
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
            <Box align='start' basis='1/2'>
              <Menu
                a11yTitle='Select period'
                items={optionDuration.map(item => (
                  { ...item, onClick: () => this.onSelectPeriod(item) }
                ))}
                label={optionDuration.find(p => (p.value === period)).label}
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
