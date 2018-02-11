import React from 'react';
import { Box, Image, Text, RoutedAnchor, Heading } from 'grommet';
import numeral from 'numeral';

export default ({ coin, ...other }) => (
  <Box border='bottom' direction='row' align='center'>
    {coin ? <Box margin='small'><Image src={coin.imageUrl} style={{ width: '34px', height: '34px' }} /></Box> : null}
    <RoutedAnchor path={`/coins/info/${other.symbol}/${other.toSymbol}/${other.exchange}`}>
      <Heading level={2} margin='none'>{coin ? coin.fullName : other.symbol}</Heading>
    </RoutedAnchor>
  </Box>
);

export const FormattedCoinValue = ({ value, toSymbol }) => (
  <Box direction='row' align='baseline'>
    <Text>
      {numeral(value).format('0,0.00')}
    </Text>
    <Text size='xsmall'>
      {toSymbol}
    </Text>

  </Box>
);
