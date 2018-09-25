import React from 'react';
import { graphql } from 'react-apollo';
import { Chart } from 'grommet';
import { longDate } from 'grommet-controls/utils';
import { priceHistoryQuery } from '../../graphql/coins';


const PriceChart = ({ color, data: { prices } }) => (
  prices && prices.list ? (
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
    />) : null
);


export default graphql(priceHistoryQuery, {
  options: props => ({
    variables: {
      symbol: props.symbol,
      toSymbol: props.toSymbol,
      exchange: props.exchange,
      period: props.period,
      limit: props.points,
    },
  }),
})(PriceChart);
