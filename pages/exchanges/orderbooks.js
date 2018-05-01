import React from 'react';
import { withRouter } from 'next/router';
import App from '../../components/App';
import connect from '../../redux';
import Exchange from '../../components/exchanges/Exchange';
import FavoriteOrderBooks from '../../components/coins/FavoriteOrderBooks';
import withData from '../../apollo/withData';
import ExchangePageMenu from '../../components/exchanges/ExchangePageMenu';

const ExchancePrices = ({ exchange }) => (
  <App
    title={exchange}
    visibleTitle={<Exchange exchange={exchange} />}
    menu={<ExchangePageMenu activeItem={1} exchange={exchange} />}
  >
    <FavoriteOrderBooks exchange={exchange} />
  </App>
);

const mapStateToProps = (state, props) => {
  const exchange = props.router.query.exchange || state.settings.defaultExchange;
  return {
    exchange,
  };
};

export default withRouter(withData(connect(mapStateToProps)(ExchancePrices)));
