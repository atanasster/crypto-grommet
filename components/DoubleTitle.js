import React from 'react';
import { Box } from 'grommet';
import { Card } from 'grommet-controls';

export default ({ children }) => (
  <Card.CardTitle border='bottom'>
    <Box gap='small' align='center' fill='horizontal'>
      {children}
    </Box>
  </Card.CardTitle>
);
