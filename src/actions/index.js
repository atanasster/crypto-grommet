import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import exchanges from './exchanges/reducer';
import exchange from './exchange/reducer';
import countries from './countries/reducer';
import coins from './coins/reducer';
import orderBook from './order_book/reducer';
import priceHistory from './price_history/reducer';
import priceStream from './price_stream/reducer';
import settings from './settings/reducer';
import marketCap from './market_cap/reducer';

export default combineReducers({
  exchange,
  exchanges,
  coins,
  countries,
  marketCap,
  orderBook,
  priceHistory,
  priceStream,
  routing,
  settings,
});
