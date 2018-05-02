import App from '../../components/App';
import CoinsList from '../../components/coins/CoinsList';
import withData from '../../apollo/withData';
import connect from '../../redux';

const Coins = ({ defaultExchange, defaultCurrency }) => (
  <App title='Coins list'>
    <CoinsList
      exchange={defaultExchange}
      currency={defaultCurrency}
    />
  </App>
);

const mapStateToProps = state => ({
  defaultExchange: state.settings.defaultExchange,
  defaultCurrency: state.settings.defaultCurrency,
});


export default withData(connect(mapStateToProps)(Coins));

