import React from 'react';
import { withRouter } from 'next/router';
import App from '../../components/App';
import connect from '../../redux';
import Exchange from '../../components/exchanges/Exchange';
import ExchangeCurrencies from '../../components/exchanges/ExchangeCurrencies';
import withData from '../../apollo/withData';
import ExchangePageMenu from '../../components/exchanges/ExchangePageMenu';

const ExchanceCurrencies = ({ exchange }) => (
  <App
    title={`${exchange} currencies`}
    visibleTitle={<Exchange exchange={exchange} />}
    menu={<ExchangePageMenu activeItem={2} exchange={exchange} />}
  >
    <ExchangeCurrencies exchange={exchange} />
  </App>
);

const mapStateToProps = (state, props) => {
  const exchange = props.router.query.exchange || state.settings.defaultExchange;
  return {
    exchange,
  };
};

export default withRouter(withData(connect(mapStateToProps)(ExchanceCurrencies)));
