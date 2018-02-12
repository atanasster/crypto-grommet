import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../screens/Home';
import About from '../screens/About';
import ExchangesList from '../screens/exchanges/ExchangesList';
import ExchangePrices from '../screens/exchanges/ExchangePrices';
import ExchangeOrderBooks from '../screens/exchanges/ExchangeOrderBooks';
import ExchangeCurrencies from '../screens/exchanges/ExchangeCurrencies';
import ExchangeFees from '../screens/exchanges/ExchangeFees';
import CoinsList from '../screens/coins/CoinsList';
import CoinOrderBook from '../screens/coins/CoinOrderBook';
import CoinInfo from '../screens/coins/CoinInfo';

export default () => (
  <Switch>
    <Route exact={true} path='/' component={Home} />
    <Route exact={true} path='/about' component={About} />
    <Route exact={true} path='/exchanges/prices/:exchange' component={ExchangePrices} />
    <Route exact={true} path='/exchanges/order_books/:exchange' component={ExchangeOrderBooks} />
    <Route exact={true} path='/exchanges/currencies/:exchange' component={ExchangeCurrencies} />
    <Route exact={true} path='/exchanges/fees/:exchange' component={ExchangeFees} />
    <Route exact={true} path='/exchanges' component={ExchangesList} />
    <Route exact={true} path='/coins/order_book/:symbol/:toSymbol/:exchange' component={CoinOrderBook} />
    <Route exact={true} path='/coins/info/:symbol/:toSymbol/:exchange' component={CoinInfo} />
    <Route exact={true} path='/coins' component={CoinsList} />
  </Switch>
);
