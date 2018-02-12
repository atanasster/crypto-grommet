import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';
import { Close, Checkmark } from 'grommet-icons';
import { Box, Text } from 'grommet';
import Card from '../../components/cards/Card';
import Coin from '../../components/Coin';
import ExchangePage from '../../components/pages/ExchangePage';
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

function tableOfTiers(tiers, key) {
  if (!tiers) {
    return null;
  }
  return (
    <Table>
      <tbody>
        {tiers.map((item, index) => (
          <tr key={`${key}_${index}`}>
            <td>{item[0]}</td>
            <td>
              {numeral(item[1]).format('0,0.0000')}
            </td>
          </tr>
        ))
        }
      </tbody>
    </Table>
  );
}

class ExchangeFees extends Component {
  componentDidMount() {
    this.props.requestExchangeInfo(this.props.match.params.exchange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.exchange !== this.props.match.params.exchange) {
      this.props.requestExchangeInfo(nextProps.match.params.exchange);
    }
  }

  tableOfFees(fees, key) {
    const { exchange, defaultCurrency } = this.props;
    if (!fees) {
      return null;
    }
    return (
      <Table>
        <tbody>
          {Object.keys(fees).map(k => (
            <tr key={`${key}_${k}`}>
              <td>
                <Coin
                  symbol={k}
                  toSymbol={defaultCurrency}
                  exchange={exchange}
                  level={4}
                  border={null}
                />
              </td>
              <td>{numeral(fees[k])
                .format('0,0.0000')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    const { exchange, exchangeObj } = this.props;

    let fundingFees = null;
    if (exchangeObj && exchangeObj.fees && exchangeObj.fees.funding) {
      fundingFees = (
        <Card
          title='Funding fees'
          subTitle={(
            <Box direction='row' justify='between' pad={{ vertical: 'small' }}>
              <Box
                direction='row'
                align='center'
              >
                <Text>Percentage:</Text>{yesNoIcon(exchangeObj.fees.funding.percentage)}
              </Box>
              <Box direction='row' justify='between'>
                <Text>Tier based:</Text>{yesNoIcon(exchangeObj.fees.funding.tierBased)}
              </Box>
            </Box>)}
        >
          <Box direction='row'>
            <Box basis='1/2' align='center'>
              <strong>Deposit</strong>
              {this.tableOfFees(exchangeObj.fees.funding.deposit, 'f_d')}
            </Box>
            <Box basis='1/2' align='center'>
              <strong>Withdrawal</strong>
              {this.tableOfFees(exchangeObj.fees.funding.withdraw, 'f_w')}
            </Box>
          </Box>
        </Card>
      );
    }
    let tradingFees = null;
    if (exchangeObj && exchangeObj.fees && exchangeObj.fees.trading) {
      let tiers = null;
      if (exchangeObj.fees.trading.tiers) {
        tiers = (
          <Box direction='row'>
            <Box basis='1/2' align='center'>
              <strong>Maker</strong>
              {tableOfTiers(exchangeObj.fees.trading.tiers.maker, 't_m')}
            </Box>
            <Box basis='1/2' align='center'>
              <strong>Taker</strong>
              {tableOfTiers(exchangeObj.fees.trading.tiers.taker, 't_t')}
            </Box>
          </Box>
        );
      }
      tradingFees = (
        <Card
          title='Trading fees'
          subTitle={(
            <Box>
              <Box direction='row' full='' pad={{ vertical: 'small' }}>
                <Box direction='row' align='center'>
                  <Text>Percentage:</Text>
                  {yesNoIcon(exchangeObj.fees.trading.percentage)}
                </Box>
                <Box direction='row' align='center'>
                  <Text>Tier based:</Text>
                  {yesNoIcon(exchangeObj.fees.trading.tierBased)}
                </Box>
              </Box>
              <Box direction='row' justify='between' pad={{ vertical: 'small' }}>
                <Box direction='row' align='center'>
                  <Text>Maker:</Text>
                  <Text>{exchangeObj.fees.trading.maker}</Text>
                </Box>
                <Box direction='row' align='center'>
                  <Text>Taker:</Text>
                  <Text>{exchangeObj.fees.trading.taker}</Text>
                </Box>
              </Box>
            </Box>
          )}
        >
          {tiers}
        </Card>
      );
    }
    return (
      <ExchangePage exchange={exchange}>
        <Box direction='row' >
          {fundingFees}
          {tradingFees}
        </Box>
      </ExchangePage>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ requestExchangeInfo }, dispatch);

const mapStateToProps = (state, props) => (
  {
    exchange: props.match.params.exchange,
    exchangeObj: state.exchange[props.match.params.exchange],
    defaultCurrency: state.settings.defaultCurrency,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeFees);
