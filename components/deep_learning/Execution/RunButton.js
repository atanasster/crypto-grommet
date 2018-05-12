import React from 'react';
import { Button, Box } from 'grommet';
import { Spinning } from 'grommet-controls';

export default ({ running, label, onClick }) => (
  <Button
    theme={{ button: { minWidth: '200px' } }}
    onClick={!running ? onClick : undefined}
    label={(
      <Box >
        <Box
          alignSelf='center'
          direction='row'
          align='center'
          gap='small'
        >
          {running && <Spinning />}
          {label}
        </Box>
      </Box>
    )}
  />
);
