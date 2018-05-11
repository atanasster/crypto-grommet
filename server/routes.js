const routes = require('next-routes')();

const SITE_ROOT = '';
module.exports.SITE_ROOT = SITE_ROOT;
// pages
routes.add({ name: 'home', pattern: `${SITE_ROOT}/`, page: `${SITE_ROOT}` });
routes.add({ name: 'about', page: `${SITE_ROOT}/about` });

// auth
routes.add('reset_password', '/reset-password/:token', `${SITE_ROOT}/reset_password`);
routes.add({ name: 'profile', pattern: '/profile', page: `${SITE_ROOT}/user/profile` });
routes.add({ name: 'login', page: `${SITE_ROOT}/login` });


// coins
routes.add('coins_by_algo', '/coins/algo/:algorithm', `${SITE_ROOT}/coins/by_algorithm`);
routes.add('coins_by_prooftype', '/coins/proof/:proofType', `${SITE_ROOT}/coins/by_prooftype`);
routes.add({ name: 'coins_home', pattern: '/coins/dashboard', page: `${SITE_ROOT}/coins` });
routes.add({ name: 'coins_list', pattern: '/coins/list', page: `${SITE_ROOT}/coins/list` });
routes.add({ name: 'coins_icos', pattern: '/coins/icos', page: `${SITE_ROOT}/coins/icos` });
routes.add({ name: 'markets_distribution', pattern: '/coins/market-distribution', page: `${SITE_ROOT}/coins/distribution` });
routes.add('coin_info', '/coins/:page/:symbol/:toSymbol?/:exchange?', `${SITE_ROOT}/coins/general`);

// exchanges
routes.add('exchange_by_country', '/exchanges/countries/:country', `${SITE_ROOT}/exchanges/countries_list`);
routes.add({ name: 'world_exchanges', pattern: '/exchanges/worldmap', page: `${SITE_ROOT}/exchanges/worldmap` });
routes.add('exchange_info', '/exchanges/:page/:exchange', `${SITE_ROOT}/exchanges/prices`);

routes.add({ name: 'exchanges', pattern: '/exchanges/list', page: `${SITE_ROOT}/exchanges` });

// equities
routes.add({ name: 'equities_home', pattern: '/equities/dashboard', page: `${SITE_ROOT}/equities` });
routes.add({ name: 'equities_list', pattern: '/equities/list', page: `${SITE_ROOT}/equities/list` });
routes.add({ name: 'equities_markets_distribution', pattern: '/equities/market-distribution', page: `${SITE_ROOT}/equities/distribution` });
routes.add({ name: 'equities_by_exchange', pattern: '/equities/exchanges/:exchange', page: `${SITE_ROOT}/equities/by_exchange` });
routes.add({ name: 'equities_by_industry', pattern: '/equities/industries/:industry', page: `${SITE_ROOT}/equities/by_industry` });
routes.add({ name: 'equities_by_sector', pattern: '/equities/sectors/:sector', page: `${SITE_ROOT}/equities/by_sector` });
routes.add({ name: 'equity_info', pattern: '/equities/info/:symbol', page: `${SITE_ROOT}/equities/general` });

// deep learning
routes.add({ name: 'models_playground', pattern: '/models/playground/:page?', page: `${SITE_ROOT}/models/play` });
module.exports = routes;
