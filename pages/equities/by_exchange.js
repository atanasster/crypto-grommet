import { withRouter } from 'next/router';
import App from '../../components/App';
import EquitiesList from '../../components/equities/EquitiesList';
import withData from '../../apollo/withData';

const Equities = ({ router: { query: { exchange } } }) => (
  <App title={`Exchange ${exchange}`}>
    <EquitiesList
      exchange={exchange}
    />
  </App>
);

export default withRouter(withData(Equities));

