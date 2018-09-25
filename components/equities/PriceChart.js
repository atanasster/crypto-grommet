import React from 'react';
import { graphql } from 'react-apollo';
import { Chart } from 'grommet';
import { longDate } from 'grommet-controls/utils';
import { priceHistoryQuery } from '../../graphql/equities';


const PriceChart = ({ color, data: { prices } }) => {
  if (prices && prices.list) {
    return (
      <Chart
        thickness='xsmall'
        type='line'
        color={color}
        size={{ width: 'full', height: 'xsmall' }}
        style={{ cursor: 'pointer' }}
        values={prices.list.results.map((price, index) => ({
          value: [index, price.close],
          label: longDate(price.date),
        }))}
      />);
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
