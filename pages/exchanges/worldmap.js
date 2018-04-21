import React from 'react';
import { Box } from 'grommet';
import App from '../../components/App';
import WorldMap from '../../components/exchanges/WorldMap';
import withData from '../../apollo/withData';

const ExchangeWorldMap = () => (
  <App title='Exchanges by continent'>
    <Box align='center' >
      <WorldMap />
    </Box>
  </App>
);

export default withData(ExchangeWorldMap);
