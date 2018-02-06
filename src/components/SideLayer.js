import React from 'react';
import { Box, Button, Layer } from 'grommet';
import { Close } from 'grommet-icons';

export default ({ onClose, children }) => (
  <Layer onEsc={onClose} position='right' onClickOverlay={onClose}>
    <Box pad='small'>
      <Box align='end'>
        <Button icon={<Close />} onClick={onClose} />
      </Box>
      {children}
    </Box>
  </Layer>
);
