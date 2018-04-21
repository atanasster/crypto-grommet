import App from '../../components/App';
import ExchangesList from '../../components/exchanges/ExchangesList';
import withData from '../../apollo/withData';

const Exchanges = () => (
  <App title='Exchanges'>
    <ExchangesList />
  </App>
);

export default withData(Exchanges);
