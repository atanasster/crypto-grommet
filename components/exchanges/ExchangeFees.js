import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import numeral from 'numeral';
import { Close, Checkmark } from 'grommet-icons';
import { Box, Text } from 'grommet';
import { PagingTable, Card } from 'grommet-controls';
import connect from '../../redux';
import Coin from '../coins/Coin';
import CardScroll from '../CardScroll';
import { exchangeFeesQuery } from '../../graphql/exchanges';
import DoubleTitle from '../DoubleTitle';

const redIcon = {
  icon: {
    color: 'red',
  },
};

const greenIcon = {
  icon: {
    color: 'green',
  },
};

function yesNoIcon(value) {
  return value ? <Checkmark theme={greenIcon} /> : <Close theme={redIcon} />;
}

class ExchangeFees extends Component {
  renderFundingFees() {
    const { data: { coinExchangeFees }, exchange: exchangeName, defaultCurrency } = this.props;

    if (coinExchangeFees && coinExchangeFees.fundingFees) {
      const { fundingFees } = coinExchangeFees;
      const fees = fundingFees.deposit.map(fee =>
        ({ symbol: fee.coin.symbol, coin: fee.coin, deposit: fee.fee }));
      if (fundingFees.withdraw) {
        fundingFees.withdraw.forEach((fee) => {
          const deposit = fees.find(item => (item.symbol === fee.symbol));
          if (deposit) {
            deposit.withdraw = fee.fee;
          } else {
            fees.push({ symbol: fee.coin.symbol, withdraw: fee.fee, coin: fee.coin });
          }
        });
      }
      const table = (
        <PagingTable
          decorations={{
            cell: {
              align: 'end',
            },
          }}
          defaultPageSize={50}
          data={fees}
          columns={[
            {
              Header: 'Symbol',
              accessor: 'coin.symbol',
              minWidth: 300,
              decorations: {
                cell: {
                  align: 'start',
                },
              },
              Cell: props => (
                <Coin
                  coin={props.original.coin}
                  toCoin={{ symbol: defaultCurrency }}
                  exchange={exchangeName}
                  level={4}
                  border={null}
                />),
            },
            {
              Header: 'Deposit',
              accessor: 'deposit',
              Cell: props => (numeral(props.value).format('0,0.0000')),
            }, {
              Header: 'Withdraw',
              accessor: 'withdraw',
              Cell: props => (numeral(props.value).format('0,0.0000')),
            },
          ]}
        />);
      return (
        <Card
          size={{ width: 'large', height: 'large' }}
        >
          <DoubleTitle>
            Funding fees
            <Box direction='row' align='center' margin={{ horizontal: 'small' }}>
              <Text>Percentage:</Text>{yesNoIcon(fundingFees.percentage)}
            </Box>
            <Box direction='row' justify='between' margin={{ horizontal: 'small' }}>
              <Text>Tier based:</Text>{yesNoIcon(fundingFees.tierBased)}
            </Box>
          </DoubleTitle>
          <Card.CardContent>
            {table}
          </Card.CardContent>
        </Card>
      );
    }
    return null;
  }

  renderTradingFees() {
    const { data: { coinExchangeFees } } = this.props;
    if (coinExchangeFees && coinExchangeFees.tradingFees) {
      const { maker, taker } = coinExchangeFees.tradingFees;
      let table;
      if (maker || taker) {
        const data = maker ? maker.map(fee =>
          ({ maker_tier: fee.tier === null ? '*' : fee.tier, maker_fee: fee.fee })) : [];
        if (taker) {
          taker.forEach((item, index) => {
            if (data.length < index) {
              data[index].push({});
            }
            data[index].taker_tier = item.tier === null ? '*' : item.tier;
            data[index].taker_fee = item.fee;
          });
        }
        table = (
          <PagingTable
            decorations={{
              cell: {
                align: 'end',
              },
            }}
            data={data}
            columns={[
              {
                Header: 'Maker',
                columns: [
                  { Header: 'Tier', accessor: 'maker_tier' },
                  { Header: 'Fee', accessor: 'maker_fee', Cell: props => (numeral(props.value).format('0,0.0000')) },
                ],
              },
              {
                Header: 'Taker',
                columns: [
                  { Header: 'Tier', accessor: 'taker_tier' },
                  { Header: 'Fee', accessor: 'taker_fee', Cell: props => (numeral(props.value).format('0,0.0000')) },
                ],
              },
            ]}
          />);
      }
      return (
        <Card size={{ width: 'large', height: 'large' }}>
          <DoubleTitle>
            Trading fees
            <Box direction='row' align='center' margin={{ horizontal: 'small' }}>
              <Text>Percentage:</Text>
              {yesNoIcon(coinExchangeFees.tradingFees.percentage)}
            </Box>
            <Box direction='row' align='center' margin={{ horizontal: 'small' }}>
              <Text>Tier based:</Text>
              {yesNoIcon(coinExchangeFees.tradingFeestierBased)}
            </Box>
          </DoubleTitle>
          <Card.CardContent>
            {table}
          </Card.CardContent>
        </Card>
      );
    }
    return null;
  }

  render() {
    return (
      <CardScroll >
        {this.renderFundingFees()}
        {this.renderTradingFees()}
      </CardScroll>
    );
  }
}


const mapStateToProps = state => (
  {
    defaultCurrency: state.settings.defaultCurrency,
  }
);

export default graphql(exchangeFeesQuery, {
  options: props => ({ variables: { exchange: props.exchange } }),
})(
  connect(mapStateToProps)(ExchangeFees)
);
