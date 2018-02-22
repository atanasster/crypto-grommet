import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Box, Text } from 'grommet';
import { subscribeLastPrices, unSubscribeLastPrices } from '../../../sockets/price_stream/CryptoComparePrices';
import Exchange from '../../exchanges/components/Exchange';
import Table from '../../../components/table/Table';
import { FormattedCoinValue, valueToColor } from '../../../components/Coin';


export default class PriceTableStream extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { priceStream: null };
  }

  onPriceStream = (data) => {
    const lastData = this.state.priceStream ? this.state.priceStream.data : {};
    this.setState({ priceStream: { ...data, data: { ...lastData, ...data.data } } });
  };

  componentDidMount() {
    const { symbol, toSymbol, exchange } = this.props;
    subscribeLastPrices({ symbol, toSymbol, exchange, callback: this.onPriceStream });
  }

  componentWillReceiveProps(nextProps) {
    const { symbol, toSymbol, exchange } = nextProps;
    if (symbol !== this.props.symbol ||
        toSymbol !== this.props.toSymbol ||
        exchange !== this.props.exchange) {
      unSubscribeLastPrices({ ...this.props, callback: this.onPriceStream });
      subscribeLastPrices({ ...nextProps, callback: this.onPriceStream });
    }
  }

  componentWillUnmount() {
    const { symbol, toSymbol, exchange } = this.props;
    unSubscribeLastPrices({ symbol, toSymbol, exchange, callback: this.onPriceStream });
  }

  render() {
    const { symbol, toSymbol } = this.props;
    const { priceStream } = this.state;
    let priceTable;
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
            <Box direction='row' justify='end'>
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
          value: <Exchange exchange={data.LASTMARKET} justify='end' />,
        }, {
          label: 'Last trade volume',
          value: (<FormattedCoinValue value={data.LASTVOLUME} toSymbol={symbol} />),
        }, {
          label: 'Last trade value',
          value: <FormattedCoinValue value={data.LASTVOLUMETO} toSymbol={toSymbol} />,
        }, {
          label: '24hr volume',
          value: (
            <FormattedCoinValue value={data.VOLUME24HOUR} toSymbol={symbol} large={true} />
          ),
        }, {
          label: '24hr value',
          value: (
            <FormattedCoinValue value={data.VOLUME24HOURTO} toSymbol={toSymbol} large={true} />
          ),
        },
      ];
      priceTable = (
        <Box align='center'>
          <Box margin={{ top: 'small' }}>
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
    return (
      <Box>
        {priceTable}
      </Box>
    );
  }
}


PriceTableStream.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
};

