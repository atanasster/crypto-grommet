import { withRouter } from 'next/router';
import App from '../../components/App';
import CoinsList from '../../components/coins/CoinsList';
import withData from '../../apollo/withData';
import connect from '../../redux';

const Coins = ({ defaultExchange, defaultCurrency, router: { query: { proofType } } }) => (
  <App title={`Coins by proof type ${proofType}`}>
    <CoinsList
      exchange={defaultExchange}
      currency={defaultCurrency}
      proofType={proofType}
    />
  </App>
);

const mapStateToProps = state => ({
  defaultExchange: state.settings.defaultExchange,
  defaultCurrency: state.settings.defaultCurrency,
});


export default withRouter(withData(connect(mapStateToProps)(Coins)));

