import App from '../../components/App';
import withData from '../../apollo/withData';
import ICOList from '../../components/coins/ICOList';

const ICOs = () => (
  <App title='Initial coin offerings'>
    <ICOList />
  </App>
);

export default withData(ICOs);

