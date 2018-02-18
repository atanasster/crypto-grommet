import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../screens/Home';
import About from '../screens/About';
import NotFound from '../screens/NotFound';
import ExchangesList from '../screens/exchanges/ExchangesList';
import ExchangePage from '../screens/exchanges/ExchangePage';
import CoinsList from '../screens/coins/CoinsList';
import ICOList from '../screens/coins/ICOList';
import MarketCapList from '../screens/markets/MarketCapList';
import MarketCapDistribution from '../screens/markets/MarketCapDistribution';
import CoinPage from '../screens/coins/CoinPage';


export default () => (
  <Switch>
    <Route exact={true} path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route exact={true} path='/markets/distribution' component={MarketCapDistribution} />
    <Route exact={true} path='/markets' component={MarketCapList} />
    <Route exact={true} path='/exchanges/:page/:exchange' component={ExchangePage} />
    <Route exact={true} path='/exchanges' component={ExchangesList} />
    <Route exact={true} path='/coins/list' component={CoinsList} />
    <Route exact={true} path='/coins/icos' component={ICOList} />
    <Route exact={true} path='/coins/:page/:symbol/:toSymbol?/:exchange?' component={CoinPage} />
    <Route component={NotFound} />
  </Switch>
);
