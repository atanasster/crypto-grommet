import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Text, RoutedAnchor } from 'grommet';
import CardScroll from '../../components/CardScroll';
import Coin from '../../components/Coin';
import Card from '../../components/cards/Card';
import Table from '../../components/table/Table';
import requestExchangeInfo from '../../actions/exchange/actions';

class ExchangeCurrencies extends Component {
  componentDidMount() {
    this.props.requestExchangeInfo(this.props.exchange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.exchange !== this.props.exchange) {
      this.props.requestExchangeInfo(nextProps.exchange);
    }
  }
  renderItem = (label, value) => (
    <Box direction='row' responsive={false}>
      <Text >{label}:</Text>
      <Text >{value || 'N/A'}</Text>
    </Box>
  );

  renderCountries = (countries) => {
    if (typeof countries === 'string') {
      return this.renderItem('Country', countries);
    }
    return this.renderItem('Countries', countries.join());
  };
  renderCurrencyPairs(currency) {
    const { exchangeObj: { markets, name: exchanegName } } = this.props;
    const pairs = Object.keys(markets).filter(key =>
      key.startsWith(`${currency}/`)).map(key => (markets[key]));
    return (
      <Table
        data={pairs}
        columns={[
          {
            accessor: 'symbol',
            Header: 'Symbol',
            Cell: props => (
              <RoutedAnchor path={`/coins/general/${props.value}/${exchanegName}`}>
                {props.value}
              </RoutedAnchor>),
          }, {
            accessor: 'darkpool',
            Header: 'DP',
          }, {
            accessor: 'maker',
            Header: 'Maker',
          }, {
            accessor: 'taker',
            Header: 'Taker',
          },
        ]}
      />
    );
  }
  render() {
    const { exchangeObj, defaultCurrency } = this.props;
    let currencies;
    if (exchangeObj && exchangeObj.currencies) {
      currencies = Object.keys(exchangeObj.currencies).map((key) => {
        const currency = exchangeObj.currencies[key];
        return (
          <Card
            key={`curr${currency.code}`}
            title={(
              <Coin
                symbol={currency.code}
                toSymbol={defaultCurrency}
                exchange={exchangeObj.name}
              />
            )}
            subTitle={`precision: ${currency.precision}`}
          >
            {this.renderCurrencyPairs(currency.code)}
          </Card>
        );
      });
    }
    return (
      <CardScroll>
        {currencies}
      </CardScroll>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ requestExchangeInfo }, dispatch);

const mapStateToProps = (state, props) =>
  ({
    exchangeObj: state.exchange[props.exchange],
    defaultCurrency: state.settings.defaultCurrency,
  });

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeCurrencies);
