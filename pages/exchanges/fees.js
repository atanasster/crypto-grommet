import React from 'react';
import { withRouter } from 'next/router';
import App from '../../components/App';
import connect from '../../redux';
import Exchange from '../../components/exchanges/Exchange';
import ExchangeFees from '../../components/exchanges/ExchangeFees';
import withData from '../../apollo/withData';
import ExchangePageMenu from '../../components/exchanges/ExchangePageMenu';

const ExchancePFees = ({ exchange }) => (
  <App
    title={`${exchange} fees`}
    visibleTitle={<Exchange exchange={exchange} />}
    menu={<ExchangePageMenu activeItem={3} exchange={exchange} />}
  >
    <ExchangeFees exchange={exchange} />
  </App>
);

const mapStateToProps = (state, props) => {
  const exchange = props.router.query.exchange || state.settings.defaultExchange;
  return {
    exchange,
  };
};

export default withRouter(withData(connect(mapStateToProps)(ExchancePFees)));
