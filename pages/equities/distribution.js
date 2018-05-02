import React from 'react';
import { Box } from 'grommet';
import App from '../../components/App';
import withData from '../../apollo/withData';
import MarketCapDistribution from '../../components/equities/MarketCapDistribution';


const MarketCap = () => (
  <App title='Top equities distribution'>
    <Box basis='xlarge'>
      <MarketCapDistribution />
    </Box>
  </App>
);

export default withData(MarketCap);
