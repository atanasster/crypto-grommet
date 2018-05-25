import React from 'react';
import { Box, Heading } from 'grommet';
import App from './App';

import RoutedAnchor from './RoutedAnchor';
import FavoritPrices from './FavoritePrices';
import CoinsMarketCapDistribution from './coins/MarketCapDistribution';
import EquitiesMarketCapDistribution from './equities/MarketCapDistribution';
import connect from '../redux';

const HomePage = ({
  defaultExchange, defaultCurrency,
}) => (
  <App title='Crypto grommet home'>
    <Box gap='small'>
      <Box border='top' align='center' fill='horizontal'>
        <Heading level={1}>
          <strong>Prices</strong>
        </Heading>
        <FavoritPrices numCards={3} />
      </Box>
      <Box border='top' align='center' fill='horizontal'>
        <Heading level={1}>
          <RoutedAnchor route='equities_markets_distribution' a11yTitle='Market cap distribution of top equities'>
            <strong>Top equities</strong>
          </RoutedAnchor>
        </Heading>
        <EquitiesMarketCapDistribution />
      </Box>
      <Box border='top' align='center' fill='horizontal'>
        <Heading level={1}>
          <RoutedAnchor route='markets_distribution' a11yTitle='Market cap distribution of crypto coins'>
            <strong>Top coins</strong>
          </RoutedAnchor>
        </Heading>
        <CoinsMarketCapDistribution exchange={defaultExchange} currency={defaultCurrency} />
      </Box>
    </Box>
  </App>
);

const mapStateToProps = state => ({
  defaultExchange: state.settings.defaultExchange,
  defaultCurrency: state.settings.defaultCurrency,
});


export default connect(mapStateToProps)(HomePage);
