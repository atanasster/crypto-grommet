import React from 'react';

import { Box } from 'grommet';


export default ({ children }) => (
  <Box flex='grow' overflow='scroll'>
    <Box pad={{ horizontal: 'medium' }}>
      <Box direction='row' wrap={true} justify='between'>
        {children}
      </Box>
    </Box>
  </Box>
);

