import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Box, Text } from 'grommet';
import { PagingTable } from 'grommet-controls';
import { longDate } from 'grommet-controls/utils/moment';
import { subscribeLastPrices, unSubscribeLastPrices } from '../../sockets/price_stream/IEXPrices';
import { valueToColor } from '../coins/Coin';


export default class PriceTableStream extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { priceStream: null };
  }

  onPriceStream = (data) => {
    const lastData = this.state.priceStream || data;
    this.setState({ priceStream: data, lastData });
  };

  componentDidMount() {
    const { symbol } = this.props;
    subscribeLastPrices({
      symbol, callback: this.onPriceStream,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { symbol } = nextProps;
    if (symbol !== this.props.symbol) {
      unSubscribeLastPrices({ ...this.props, callback: this.onPriceStream });
      subscribeLastPrices({ ...nextProps, callback: this.onPriceStream });
    }
  }

  componentWillUnmount() {
    const { symbol } = this.props;
    unSubscribeLastPrices({
      symbol, callback: this.onPriceStream,
    });
  }

  render() {
    const { priceStream, lastData } = this.state;
    let priceTable;
    if (priceStream) {
      const rows = [
        {
          label: 'Last sale ',
          value: (
            <Box direction='row' justify='end'>
              <Text>
                <strong>
                  {longDate(priceStream.lastSaleTime)}
                </strong>
              </Text>
            </Box>
          ),
        },
        {
          label: 'Prev sale ',
          value: (
            <Box direction='row' justify='end'>
              <Text>
                <strong>
                  {numeral(lastData.lastSalePrice).format('$0,0.00')}
                </strong>
              </Text>
              {' / '}
              <Text>
                <strong>{numeral(lastData.lastSaleSize).format('0,0.00')}</strong>
              </Text>
            </Box>
          ),
        },
        {
          label: 'Ask price',
          value: (
            <Box direction='row' justify='end'>
              <Text color={valueToColor(priceStream.askPrice - lastData.askPrice)}>
                <strong>
                  {numeral(priceStream.askPrice).format('$0,0.00')}
                </strong>
              </Text>
            </Box>
          ),
        },
        {
          label: 'Ask size',
          value: (
            <Box direction='row' justify='end'>
              <Text color={valueToColor(priceStream.askSize - lastData.askSize)}>
                <strong>
                  {numeral(priceStream.askSize).format('0,0.00')}
                </strong>
              </Text>
            </Box>
          ),
        },
        {
          label: 'Bid price',
          value: (
            <Box direction='row' justify='end'>
              <Text color={valueToColor(priceStream.bidPrice - lastData.bidPrice)}>
                <strong>
                  {numeral(priceStream.bidPrice).format('$0,0.00')}
                </strong>
              </Text>
            </Box>
          ),
        },
        {
          label: 'Bid size',
          value: (
            <Box direction='row' justify='end'>
              <Text color={valueToColor(priceStream.bidSize - lastData.bidSize)}>
                <strong>
                  {numeral(priceStream.bidSize).format('0,0.00')}
                </strong>
              </Text>
            </Box>
          ),
        },
        {
          label: 'Volume',
          value: (
            <Box direction='row' justify='end'>
              <Text>
                <strong>
                  {numeral(priceStream.volume).format('a')}
                </strong>
              </Text>
            </Box>
          ),
        },
        {
          label: 'Market %',
          value: (
            <Box direction='row' justify='end'>
              <Text>
                <strong>
                  {numeral(priceStream.marketPercent).format('0.00%')}
                </strong>
              </Text>
            </Box>
          ),
        },
      ];
      priceTable = (
        <Box align='center'>
          <Box margin={{ vertical: 'medium' }}>
            <strong>
              <Text size='xlarge' color={valueToColor(priceStream.lastSalePrice - lastData.lastSalePrice)} >
                {numeral(priceStream.lastSalePrice).format('$0,0.00')}
              </Text>
              {' / '}
              <Text color={valueToColor(priceStream.lastSaleSize - lastData.lastSaleSize)}>
                <strong>{numeral(priceStream.lastSaleSize).format('0,0.00')}</strong>
              </Text>
            </strong>
          </Box>
          <Box fill={true}>
            <PagingTable
              sortable={false}
              resizable={false}
              data={rows}
              columns={[
                { accessor: 'label', maxWidth: 100 },
                { accessor: 'value' },
              ]}
            />
          </Box>
        </Box>
      );
    }
    return (
      <Box fill={true}>
        {priceTable}
      </Box>
    );
  }
}


PriceTableStream.propTypes = {
  symbol: PropTypes.string.isRequired,
};

