import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Box, Text } from 'grommet';
import { PagingTable, Card } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import connect from '../../redux';
import CardScroll from '../CardScroll';
import Coin, { CoinPath } from '../coins/Coin';
import { exchangeMarketsQuery } from '../../graphql/exchanges';

class ExchangeCurrencies extends Component {
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
    const { data: { coinExchangeCurrency } } = this.props;
    const pairs = coinExchangeCurrency.markets.filter(market => market.base === currency);
    return (
      <PagingTable
        data={pairs}
        columns={[
          {
            accessor: 'quote',
            Header: 'Symbol',
            Cell: props => (
              <CoinPath
                symbol={currency}
                toSymbol={props.value}
                exchange={coinExchangeCurrency.name}
              >
                {props.value}
              </CoinPath>),
          }, {
            accessor: 'maker',
            Header: 'Maker',
            decorations: {
              cell: {
                align: 'end',
              },
            },
          }, {
            accessor: 'taker',
            Header: 'Taker',
            decorations: {
              cell: {
                align: 'end',
              },
            },
          },
        ]}
      />
    );
  }
  render() {
    const { data: { coinExchangeCurrency }, defaultCurrency } = this.props;
    let currencies;
    if (coinExchangeCurrency && coinExchangeCurrency.currencies) {
      currencies = coinExchangeCurrency.currencies.map((currency, index) => (
        <Card key={`curr_${index}`}>
          <CardTitle border='bottom'>
            <Coin
              coin={currency.coin || { symbol: currency.symbol }}
              toCoin={{ symbol: defaultCurrency }}
              exchange={coinExchangeCurrency.name}
            />
          </CardTitle>
          <CardSubTitle>
            {`precision: ${currency.precision}`}
          </CardSubTitle>
          <CardContent>
            {this.renderCurrencyPairs(currency.symbol)}
          </CardContent>
        </Card>
      ));
    }
    return (
      <CardScroll>
        {currencies}
      </CardScroll>
    );
  }
}

const mapStateToProps = state =>
  ({
    defaultCurrency: state.settings.defaultCurrency,
  });

export default graphql(exchangeMarketsQuery, {
  options: props => ({ variables: { exchange: props.exchange } }),
})(
  connect(mapStateToProps)(ExchangeCurrencies)
);
