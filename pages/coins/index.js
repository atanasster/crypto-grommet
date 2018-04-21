import App from '../../components/App';
import CoinsList from '../../components/coins/CoinsList';
import withData from '../../apollo/withData';

const Coins = () => (
  <App title='Coins'>
    <CoinsList />
  </App>
);

export default withData(Coins);

