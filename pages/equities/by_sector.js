import { withRouter } from 'next/router';
import App from '../../components/App';
import EquitiesList from '../../components/equities/EquitiesList';
import withData from '../../apollo/withData';

const Equities = ({ router: { query: { sector } } }) => (
  <App title={`Sector ${sector}`}>
    <EquitiesList
      sector={sector}
    />
  </App>
);

export default withRouter(withData(Equities));

