import { withRouter } from 'next/router';
import App from '../../components/App';
import EquitiesList from '../../components/equities/EquitiesList';
import withData from '../../apollo/withData';

const Equities = ({ router: { query: { industry } } }) => (
  <App title={`Industry ${industry}`}>
    <EquitiesList
      industry={industry}
    />
  </App>
);

export default withRouter(withData(Equities));

