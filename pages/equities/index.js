import { Box, Heading } from 'grommet';
import App from '../../components/App';
import withData from '../../apollo/withData';
import RoutedAnchor from '../../components/RoutedAnchor';
import FavoritePrices from '../../components/equities/FavoritePrices';
import MarketCapDistribution from '../../components/equities/MarketCapDistribution';


const Equities = () => (
  <App title='Equities home'>
    <Box border='top' pad='small' align='center' fill='horizontal'>
      <Heading level={1}>
        <RoutedAnchor route='equities_list' a11yTitle='Exchanges by continent'>
          <strong>Prices</strong>
        </RoutedAnchor>
      </Heading>
      <FavoritePrices />
    </Box>
    <Box border='top' align='center' fill='horizontal'>
      <Heading level={1}>
        <RoutedAnchor route='equities_markets_distribution' a11yTitle='Market cap distribution of top equities'>
          <strong>Top equities</strong>
        </RoutedAnchor>
      </Heading>
      <MarketCapDistribution />
    </Box>
  </App>
);


export default withData(Equities);
