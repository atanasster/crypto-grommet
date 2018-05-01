import React from 'react';
import { withRouter } from 'next/router';
import { compose, graphql } from 'react-apollo';
import App from '../../components/App';
import Equity from '../../components/equities/Equity';
import connect from '../../redux';
import withData from '../../apollo/withData';
import { equityDetailsQuery } from '../../components/graphql/equities';
import CardScroll from '../../components/CardScroll';
import PriceCard from '../../components/equities/PriceCard';
import PeersCard from '../../components/equities/PeersCard';

export const EquityInfo = ({ symbol, data: { equity } }) => (
  <App
    title={`${symbol}`}
    description={equity && equity.description}
    visibleTitle={equity && <Equity level={1} equity={equity} />}
  >
    {equity && (
      <CardScroll>
        <PriceCard symbol={symbol} />
        <PeersCard symbol={symbol} />
      </CardScroll>
    )}
  </App>
);


const mapStateToProps = (state, props) => {
  const symbol = props.router.query.symbol || 'AAPL';
  return {
    symbol,
  };
};


export default withRouter(withData(connect(mapStateToProps)(compose(
  graphql(equityDetailsQuery, { options: props => ({ variables: { symbol: props.symbol } }) }),
)(EquityInfo))));
