import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../screens/Home';
import About from '../screens/About';
import Exchange from '../screens/Exchange';
import ExchangesList from '../screens/ExchangesList';
import CoinsList from '../screens/CoinsList';
import CoinOrderBook from '../screens/CoinOrderBook';
import CoinInfo from '../screens/CoinInfo';

export default () => (
  <Switch>
    <Route exact={true} path='/' component={Home} />
    <Route exact={true} path='/about' component={About} />
    <Route exact={true} path='/exchanges/:exchange' component={Exchange} />
    <Route exact={true} path='/exchanges' component={ExchangesList} />
    <Route exact={true} path='/coins/order_book/:symbol/:toSymbol/:exchange' component={CoinOrderBook} />
    <Route exact={true} path='/coins/info/:symbol/:toSymbol/:exchange' component={CoinInfo} />
    <Route exact={true} path='/coins' component={CoinsList} />
  </Switch>
);
