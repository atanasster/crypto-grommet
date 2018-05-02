import { Box, Heading } from 'grommet';
import App from '../../components/App';
import withData from '../../apollo/withData';
import connect from '../../redux';
import RoutedAnchor from '../../components/RoutedAnchor';
import FavoritePrices from '../../components/coins/FavoritePrices';
import WorldMap from '../../components/exchanges/WorldMap';
import CoinsMarketCapDistribution from '../../components/coins/MarketCapDistribution';


const Coins = ({ defaultExchange, defaultCurrency, responsive }) => (
  <App title='Crypto currencies home'>
    <Box border='top' pad='small' align='center' fill='horizontal'>
      <Heading level={1}>
        <RoutedAnchor route='coins_list' a11yTitle='Exchanges by continent'>
          <strong>Prices</strong>
        </RoutedAnchor>
      </Heading>
      <FavoritePrices />
    </Box>
    <Box border='top' align='center' style={{ height: responsive ? '430px' : undefined }} fill='horizontal'>
      <Heading level={1}>
        <RoutedAnchor route='world_exchanges' a11yTitle='Exchanges by continent'>
          <strong>Exchanges by continent</strong>
        </RoutedAnchor>
      </Heading>
      <WorldMap />
    </Box>
    <Box border='top' align='center' fill='horizontal'>
      <Heading level={1}>
        <RoutedAnchor route='markets_distribution' a11yTitle='Market cap distribution of crypto coins'>
          <strong>Top coins</strong>
        </RoutedAnchor>
      </Heading>
      <CoinsMarketCapDistribution exchange={defaultExchange} currency={defaultCurrency} />
    </Box>
  </App>
);

const mapStateToProps = state => ({
  responsive: state.nav.responsive,
  defaultExchange: state.settings.defaultExchange,
  defaultCurrency: state.settings.defaultCurrency,
});


export default withData(connect(mapStateToProps)(Coins));
