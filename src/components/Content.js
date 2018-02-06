import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../screens/Home';
import About from '../screens/About';
import Exchange from '../screens/Exchange';
import ExchangesList from '../screens/ExchangesList';
import CoinsList from '../screens/CoinsList';
import OrderBook from '../screens/OrderBook';

export default () => (
  <Switch>
    <Route exact={true} path='/' component={Home} />
    <Route exact={true} path='/about' component={About} />
    <Route exact={true} path='/exchanges/:exchange' component={Exchange} />
    <Route exact={true} path='/exchanges' component={ExchangesList} />
    <Route exact={true} path='/coins' component={CoinsList} />
    <Route exact={true} path='/order_book/:symbol/:toSymbol' component={OrderBook} />
  </Switch>
);
