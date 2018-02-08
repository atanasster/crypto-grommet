import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import numeral from 'numeral';
import { Box, Heading, Text, Chart, Image } from 'grommet';
import { subscribeLastPrices, unSubscribeLastPrices } from '../actions/price_stream/actions';
import * as ActionTypes from '../actions/price_stream/constants';
import Table from './table/Table';

class PriceCard extends Component {
  componentWillMount() {
    const { history: { symbol, toSymbol, exchange } } = this.props;
    this.props.subscribeLastPrices({ symbol, toSymbol, exchange });
  }

  componentWillUnmount() {
    const { history: { symbol, toSymbol, exchange } } = this.props;
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
          <Box border='bottom'>
            <Text size='xlarge' color={priceColor} margin='medium'>{numeral(data.PRICE).format('$0,0.00')}</Text>
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
  render() {
    const { history, color, coin } = this.props;
    return (
      <Box pad='small' margin='small' border='all' align='center'>
        <Box border='bottom'><Heading level={2} margin='none'>{coin ? coin.fullName : history.symbol}</Heading></Box>
        <Box border='bottom'>
          {coin ? <Box margin='small'><Image src={coin.imageUrl} style={{ width: '34px', height: '34px' }} /></Box> : null}
          <Text>{history.exchange}</Text>
        </Box>
        <Box pad='small'>
          <Box border='bottom'>
            <Chart
              thickness='xsmall'
              type='line'
              color={color}
              values={history.orderBook.map((price, index) => ({
                value: [index, price.close],
                label: moment(price.time)
                  .format('LLL'),
              }))}
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
  history: PropTypes.object.isRequired,
  color: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  { subscribeLastPrices, unSubscribeLastPrices }, dispatch);

const mapStateToProps = (state, props) => ({
  priceStream: state.priceStream[ActionTypes.actionToKey(props.history)],
  coin: state.coins.all.find(c => (c.symbol === props.history.symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceCard);
