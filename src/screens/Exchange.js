import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Text, Image, Heading, RoutedAnchor } from 'grommet';
import CardScroll from '../components/CardScroll';
import Page from '../components/Page';
import Table from '../components/table/Table';
import requestExchangeInfo from '../actions/exchange/actions';

class Exchange extends Component {
  componentDidMount() {
    this.props.requestExchangeInfo(this.props.match.params.exchange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.exchange !== this.props.match.params.exchange) {
      this.props.requestExchangeInfo(nextProps.match.params.exchange);
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
    const { exchange: { markets, name: exchanegName } } = this.props;
    const pairs = Object.keys(markets).filter(key =>
      key.startsWith(`${currency}/`)).map(key => (markets[key]));
    const rows = pairs.map(pair => (
      <tr key={`${currency}_${pair.id}`}>
        <td><RoutedAnchor path={`/coins/info/${pair.symbol}/${exchanegName}`}>{pair.symbol}</RoutedAnchor></td>
        <td>{pair.darkpool ? 'Y' : ''}</td>
        <td>{pair.maker}</td>
        <td>{pair.taker}</td>
      </tr>
    ));
    return (
      <Table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>DP</th>
            <th>Maker</th>
            <th>Taker</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }
  render() {
    const { exchange } = this.props;
    let currencies;
    if (exchange.currencies) {
      currencies = Object.keys(exchange.currencies).map((key) => {
        const currency = exchange.currencies[key];
        return (
          <Box key={`curr${currency.code}`} border='all' margin='small' pad='small' align='center'>
            <RoutedAnchor path={`/coins/info/${currency.code}/USD/${exchange.name}`}>{currency.code}</RoutedAnchor>
            <Text size='xsmall'>precision: {currency.precision}</Text>
            {this.renderCurrencyPairs(currency.code)}
          </Box>
        );
      });
    }
    return (
      <Page name={<Box direction='row' align='center'><Image src={exchange.logo} />{exchange.name}</Box>}>
        <Box align='center'>
          <Heading level={4} margin='none'><strong>Currencies</strong></Heading>
          <CardScroll>
            {currencies}
          </CardScroll>
        </Box>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ requestExchangeInfo }, dispatch);

const mapStateToProps = (state, props) =>
  ({
    exchange: state.exchange[props.match.params.exchange] ||
  { id: props.match.params.exchange, name: props.match.params.exchange },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
