import App from '../../components/App';
import EquitiesList from '../../components/equities/EquitiesList';
import withData from '../../apollo/withData';

const Equities = () => (
  <App title='Equities'>
    <EquitiesList />
  </App>
);

export default withData(Equities);

