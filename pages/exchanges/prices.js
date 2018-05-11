import React from 'react';
import { withRouter } from 'next/router';
import { Box } from 'grommet';
import App from '../../components/App';
import connect from '../../redux';
import Exchange from '../../components/exchanges/Exchange';
import FavoritePrices from '../../components/coins/FavoritePrices';
import FavoriteOrderBooks from '../../components/coins/FavoriteOrderBooks';
import ExchangeFees from '../../components/exchanges/ExchangeFees';
import ExchangeCurrencies from '../../components/exchanges/ExchangeCurrencies';
import withData from '../../apollo/withData';
import LinksMenu from '../../components/LinksMenu';


const exchangeMenu = exchange => [
  {
    route: 'exchange_info',
    params: { exchange, page: 'prices' },
    label: 'prices',
    a11yTitle: `Favorite coins prices on ${exchange}`,
    plain: true,
  },
  {
    route: 'exchange_info',
    params: { exchange, page: 'orderbooks' },
    label: 'orderbooks',
    a11yTitle: `Favorite coins order books on ${exchange}`,
    plain: true,
  },
  {
    route: 'exchange_info',
    params: { exchange, page: 'currencies' },
    label: 'currencies',
    a11yTitle: `Trading currencies on ${exchange}`,
    plain: true,
  },
  {
    route: 'exchange_info',
    params: { exchange, page: 'fees' },
    label: 'fees',
    a11yTitle: `Trading and funcding fees on ${exchange}`,
    plain: true,
  },

];
const renderView = ({ page, exchange }) => {
  switch (page) {
    case 'orderbooks':
      return <FavoriteOrderBooks exchange={exchange} />;
    case 'fees':
      return <ExchangeFees exchange={exchange} />;
    case 'currencies':
      return <ExchangeCurrencies exchange={exchange} />;
    case 'prices':
    default:
      return <FavoritePrices exchange={exchange} />;
  }
};
const ExchancePrices = ({ exchange, router: { query: { page = 'prices' } } }) => (
  <App
    title={exchange}
    visibleTitle={(
      <Box direction='row' align='center' justify='between' fill='horizontal'>
        <Exchange size='xlarge' exchange={exchange} />
        <Box>
          <LinksMenu
            items={exchangeMenu(exchange)}
            activeItem={exchangeMenu(exchange).findIndex(item => item.label === page)}
          />
        </Box>
      </Box>
     )}
  >
    {renderView({ page, exchange })}
  </App>
);

const mapStateToProps = (state, props) => {
  const exchange = props.router.query.exchange || state.settings.defaultExchange;
  return {
    exchange,
  };
};

export default withRouter(withData(connect(mapStateToProps)(ExchancePrices)));
