import React from 'react';
import { Box, Button, Layer, Heading } from 'grommet';
import { Close } from 'grommet-icons';

export default ({ onClose, children, heading }) => (
  <Layer onEsc={onClose} position='right' onClickOutside={onClose} full='vertical'>
    <Box style={{ minWidth: '450px' }} pad='small' overflow='auto' fill='horizontal' flex='grow'>
      <Box align='end'>
        <Button icon={<Close />} onClick={onClose} />
      </Box>
      <Heading level={1} margin='none'>
        <strong>{heading}</strong>
      </Heading>
      <Box pad='small'>
        {children}
      </Box>
    </Box>
  </Layer>
);
