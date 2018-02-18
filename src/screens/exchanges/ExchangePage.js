import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Box } from 'grommet';
import Page from '../../components/pages/Page';
import { NavAnchor } from '../../components/utils/Links';
import Exchange from '../../components/Exchange';
import ExchangePrices from './ExchangePrices';
import ExchangeFees from './ExchangeFees';
import ExchangeOrderBooks from './ExchangeOrderBooks';
import ExchangeCurrencies from './ExchangeCurrencies';


const ExchangePage = ({ exchange }) => (
  <Page name={<Exchange exchange={exchange} border={null} level={2} />}>
    <Box direction='row' align='center' gap='small'>
      <NavAnchor
        path={`/exchanges/prices/${exchange}`}
        label='Prices'
        a11yTitle={`Pricing for favorite tickers on ${exchange}`}
      />
      <NavAnchor
        path={`/exchanges/order_books/${exchange}`}
        label='Order books'
        a11yTitle={`Order books on ${exchange}`}
      />
      <NavAnchor
        path={`/exchanges/currencies/${exchange}`}
        label='Currencies'
        a11yTitle={`Available currencies on ${exchange}`}
      />
      <NavAnchor
        path={`/exchanges/fees/${exchange}`}
        label='Fees'
        a11yTitle={`Funding and trading fees on ${exchange}`}
      />
    </Box>
    <Box align='center' fill='horizontal'>
      <Switch>
        <Route exact={true} path='/exchanges/prices/:exchange' render={() => <ExchangePrices exchange={exchange} />} />
        <Route exact={true} path='/exchanges/order_books/:exchange' render={() => <ExchangeOrderBooks exchange={exchange} />} />
        <Route exact={true} path='/exchanges/currencies/:exchange' render={() => <ExchangeCurrencies exchange={exchange} />} />
        <Route exact={true} path='/exchanges/fees/:exchange' render={() => <ExchangeFees exchange={exchange} />} />
      </Switch>
    </Box>
  </Page>
);

const mapStateToProps = (state, props) => {
  const exchange = props.match.params.exchange || state.settings.defaultExchange;
  return {
    exchange,
  };
};

export default withRouter(connect(mapStateToProps)(ExchangePage));
