import React from 'react';
import { Box, Heading, Text } from 'grommet';

export default ({ title, subTitle, children }) => (
  <Box pad='small' margin='small' border='all' align='center'>
    <Box border='bottom' direction='row' align='center'>
      <Heading level={2} margin='none'>{title}</Heading>
    </Box>
    <Box margin='small'>
      <Text size='medium'><strong>{subTitle}</strong></Text>
    </Box>
    <Box pad='small'>
      <Box border='horizontal'>
        {children}
      </Box>
    </Box>
  </Box>
);

