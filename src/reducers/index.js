import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import api from './api';
import errors from '../actions/errors/reducer';
import exchanges from '../actions/exchanges/reducer';
import exchange from '../actions/exchange/reducer';
import countries from '../actions/countries/reducer';
import coins from '../actions/coins/reducer';
import orderBook from '../actions/order_book/reducer';
import priceHistory from '../actions/price_history/reducer';

export default combineReducers({
  api,
  errors,
  exchanges,
  countries,
  exchange,
  coins,
  orderBook,
  routing,
  priceHistory,
});
