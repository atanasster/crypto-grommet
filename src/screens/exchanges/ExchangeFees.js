import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';
import { Close, Checkmark } from 'grommet-icons';
import { Box, Text } from 'grommet';
import Card from '../../components/Card';
import Coin from '../../components/Coin';
import CardScroll from '../../components/CardScroll';
import requestExchangeInfo from '../../actions/exchange/actions';
import Table from '../../components/table/Table';

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
  componentDidMount() {
    this.props.requestExchangeInfo(this.props.exchange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.exchange !== this.props.exchange) {
      this.props.requestExchangeInfo(nextProps.exchange);
    }
  }

  renderFundingFees() {
    const { exchangeObj, exchange, defaultCurrency } = this.props;

    if (exchangeObj && exchangeObj.fees && exchangeObj.fees.funding) {
      const funding = exchangeObj.fees.funding;
      const fees = funding.deposit ? Object.keys(funding.deposit).map(k => (
        { symbol: k, deposit: funding.deposit[k] }
      )) : [];
      if (funding.withdraw) {
        Object.keys(funding.withdraw).forEach((k) => {
          const deposit = fees.find(item => (item.symbol === k));
          if (deposit) {
            deposit.withdraw = funding.withdraw[k];
          } else {
            fees.push({ symbol: k, withdraw: funding.withdraw[k] });
          }
        });
      }
      const table = (
        <Table
          defaultPageSize={50}
          data={fees}
          columns={[
            {
              Header: 'Symbol',
              accessor: 'symbol',
              Cell: props => (
                <Coin
                  symbol={props.value}
                  toSymbol={defaultCurrency}
                  exchange={exchange}
                  level={4}
                  border={null}
                />),
            }, {
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
          title='Funding fees'
          subTitle={(
            <Box direction='row' justify='between' pad={{ vertical: 'small' }}>
              <Box direction='row' align='center' margin={{ horizontal: 'small' }}>
                <Text>Percentage:</Text>{yesNoIcon(exchangeObj.fees.funding.percentage)}
              </Box>
              <Box direction='row' justify='between' margin={{ horizontal: 'small' }}>
                <Text>Tier based:</Text>{yesNoIcon(exchangeObj.fees.funding.tierBased)}
              </Box>
            </Box>)}
        >
          {table}
        </Card>
      );
    }
    return null;
  }

  renderTradingFees() {
    const { exchangeObj } = this.props;
    if (exchangeObj && exchangeObj.fees && exchangeObj.fees.trading) {
      const tiers = exchangeObj.fees.trading.tiers;
      let table;
      if (tiers) {
        const data = tiers.maker ? [...tiers.maker] : [];
        if (tiers.taker) {
          tiers.taker.forEach((item, index) => {
            if (data.length < index) {
              data.push([undefined, undefined]);
            }
            data[index][2] = item[0];
            data[index][3] = item[1];
          });
        }
        table = (
          <Table
            data={data}
            columns={[
              {
                Header: 'Maker',
                columns: [
                  { Header: 'Tier', accessor: '0' },
                  { Header: 'Fee', accessor: '1', Cell: props => (numeral(props.value).format('0,0.0000')) },
                ],
              },
              {
                Header: 'Taker',
                columns: [
                  { Header: 'Tier', accessor: '2' },
                  { Header: 'Fee', accessor: '3', Cell: props => (numeral(props.value).format('0,0.0000')) },
                ],
              },
            ]}
          />);
      }
      return (
        <Card
          title='Trading fees'
          subTitle={(
            <Box>
              <Box direction='row' fill='horizontal' pad={{ vertical: 'small' }}>
                <Box direction='row' align='center' margin={{ horizontal: 'small' }}>
                  <Text>Percentage:</Text>
                  {yesNoIcon(exchangeObj.fees.trading.percentage)}
                </Box>
                <Box direction='row' align='center' margin={{ horizontal: 'small' }}>
                  <Text>Tier based:</Text>
                  {yesNoIcon(exchangeObj.fees.trading.tierBased)}
                </Box>
              </Box>
            </Box>
          )}
        >
          {table}
        </Card>
      );
    }
    return null;
  }

  render() {
    return (
      <CardScroll >
        <Box basis='2/3'>
          {this.renderFundingFees()}
        </Box>
        <Box basis='1/3'>
          {this.renderTradingFees()}
        </Box>
      </CardScroll>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ requestExchangeInfo }, dispatch);

const mapStateToProps = (state, props) => (
  {
    exchangeObj: state.exchange[props.exchange],
    defaultCurrency: state.settings.defaultCurrency,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeFees);
