import React from 'react';
import { graphql } from 'react-apollo';
import PriceHistoryChart from '../charts/PriceHistoryChart';
import { priceHistoryQuery } from '../../graphql/equities';


const PriceChart = ({ color, data: { prices } }) => {
  if (prices && prices.list) {
    const dataset = {
      label: 'test',
      data: prices.list.results.map(d => ({ x: d.date, y: d.close })),
      fill: false,
      color,
    };
    return (
      <PriceHistoryChart
        data={dataset}
      />
    );
  }
  return null;
};


export default graphql(priceHistoryQuery, {
  options: props => ({
    variables: {
      symbol: props.symbol,
      limit: props.points,
    },
  }),
})(PriceChart);
