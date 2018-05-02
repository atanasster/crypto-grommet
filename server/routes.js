const routes = require('next-routes')();

const SITE_ROOT = '';
module.exports.SITE_ROOT = SITE_ROOT;

routes.add({ name: 'home', pattern: `${SITE_ROOT}/`, page: `${SITE_ROOT}` });
routes.add('coin_info', '/coins/info/:symbol/:toSymbol?/:exchange?', `${SITE_ROOT}/coins/general`);
routes.add('coin_order_books', '/coins/orderbooks/:symbol/:toSymbol?/:exchange?', `${SITE_ROOT}/coins/orderbooks`);
routes.add('coin_charts', '/coins/charts/:symbol/:toSymbol?/:exchange?', `${SITE_ROOT}/coins/charts`);
routes.add('coins_by_algo', '/coins/algo/:algorithm', `${SITE_ROOT}/coins/by_algorithm`);
routes.add('coins_by_prooftype', '/coins/proof/:proofType', `${SITE_ROOT}/coins/by_prooftype`);
routes.add('reset_password', '/reset-password/:token', `${SITE_ROOT}/reset_password`);
routes.add({ name: 'profile', pattern: '/profile', page: `${SITE_ROOT}/user/profile` });

routes.add('exchange_info', '/exchanges/prices/:exchange', `${SITE_ROOT}/exchanges/prices`);
routes.add('exchange_by_country', '/exchanges/countries/:country', `${SITE_ROOT}/exchanges/countries_list`);
routes.add('exchange_order_books', '/exchanges/orderbooks/:exchange', `${SITE_ROOT}/exchanges/orderbooks`);

routes.add('exchange_currencies', '/exchanges/currencies/:exchange', `${SITE_ROOT}/exchanges/currencies`);
routes.add('exchange_fees', '/exchanges/fees/:exchange', `${SITE_ROOT}/exchanges/fees`);


routes.add({ name: 'about', page: `${SITE_ROOT}/about` });
routes.add({ name: 'login', page: `${SITE_ROOT}/login` });
routes.add({ name: 'markets_distribution', pattern: '/coins/market-distribution', page: `${SITE_ROOT}/coins/distribution` });
routes.add({ name: 'world_exchanges', page: `${SITE_ROOT}/exchanges/worldmap` });
routes.add({ name: 'exchanges', page: `${SITE_ROOT}/exchanges` });
routes.add({ name: 'coins_home', pattern: '/coins', page: `${SITE_ROOT}/coins` });
routes.add({ name: 'coins_list', pattern: '/coins/list', page: `${SITE_ROOT}/coins/list` });
routes.add({ name: 'coins_icos', pattern: '/coins/icos', page: `${SITE_ROOT}/coins/icos` });

routes.add({ name: 'equities_home', pattern: '/equities', page: `${SITE_ROOT}/equities` });
routes.add({ name: 'equities_list', pattern: '/equities/list', page: `${SITE_ROOT}/equities/list` });
routes.add({ name: 'equities_markets_distribution', pattern: '/equities/market-distribution', page: `${SITE_ROOT}/equities/distribution` });
routes.add({ name: 'equities_by_exchange', pattern: '/equities/exchanges/:exchange', page: `${SITE_ROOT}/equities/by_exchange` });
routes.add({ name: 'equities_by_industry', pattern: '/equities/industries/:industry', page: `${SITE_ROOT}/equities/by_industry` });
routes.add({ name: 'equities_by_sector', pattern: '/equities/sectors/:sector', page: `${SITE_ROOT}/equities/by_sector` });

routes.add({ name: 'equity_info', pattern: '/equities/info/:symbol', page: `${SITE_ROOT}/equities/general` });
module.exports = routes;
