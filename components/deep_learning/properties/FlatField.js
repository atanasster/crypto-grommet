import React from 'react';
import { Box, Text } from 'grommet';

export default ({ label, children }) => (
  <Box direction='row' align='center' justify='between'>
    <Text>{`${label} `}</Text>
    <Box flex={false} basis='small'>
      {children}
    </Box>
  </Box>
);

