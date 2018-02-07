import React from 'react';
import moment from 'moment';
import { Box, Heading, Text, Chart } from 'grommet';


export default ({ history, color }) => (
  <Box pad='small' margin='small' border='all' align='center'>
    <Heading level={1} margin='none'>{`${history.symbol}/${history.toSymbol}`}</Heading>
    <Text>{history.exchange}</Text>
    <Box pad='small'>
      <Chart
        thickness='xsmall'
        type='line'
        color={color}
        values={history.orderBook.map((price, index) => ({ value: [index, price.close], label: moment(price.time).format('LLL')}))}
      />
    </Box>
  </Box>
);
