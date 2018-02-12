import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import exchanges from '../actions/exchanges/reducer';
import exchange from '../actions/exchange/reducer';
import countries from '../actions/countries/reducer';
import coins from '../actions/coins/reducer';
import orderBook from '../actions/order_book/reducer';
import priceHistory from '../actions/price_history/reducer';
import priceStream from '../actions/price_stream/reducer';
import settings from '../actions/settings/reducer';

export default combineReducers({
  exchanges,
  countries,
  exchange,
  coins,
  orderBook,
  routing,
  priceStream,
  priceHistory,
  settings,
});
