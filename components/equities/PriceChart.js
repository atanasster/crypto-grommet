import React from 'react';
import { graphql } from 'react-apollo';
import { Chart } from 'grommet';
import { longDate } from 'grommet-controls/utils/moment';
import { priceHistoryQuery } from '../graphql/equities';


const PriceChart = ({ color, data }) => {
  if (data.equity && data.equity.list) {
    return (
      <Chart
        thickness='xsmall'
        type='line'
        color={color}
        size={{ width: 'full', height: 'xsmall' }}
        style={{ cursor: 'pointer' }}
        values={data.equity.list.results.map((price, index) => ({
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
