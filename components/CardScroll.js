import React from 'react';
import { Grid } from 'grommet';


export default ({ children }) => (
  <Grid columns='medium' gap='small' fill='horizontal'>
    {children}
  </Grid>
);

