import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { ImageStamp } from 'grommet-controls';
import RoutedAnchor from '../RoutedAnchor';
import routerPush from '../Router';

export const EquityPath = ({
  symbol, children,
}) => (
  <RoutedAnchor route='equity_info' params={{ symbol }} >
    {children}
  </RoutedAnchor>
);

export const pushEquityPath = ({ symbol }) => {
  routerPush({ route: 'equity_info', params: { symbol } });
};
const Equity = ({
  equity, level, showName, ...rest
}) => {
  const title = (
    <Heading level={level} margin='none' truncate={true}>
      {showName ? `${equity.symbol} - ${equity.name}` : equity.symbol}
    </Heading>
  );
  const link = equity && equity.symbol ? (
    <EquityPath
      symbol={equity.symbol}
    >
      {title}
    </EquityPath>
  ) : title;
  let image;
  if (equity && equity.image) {
    image = (
      <ImageStamp
        src={equity.image}
        size={level > 2 ? 'medium' : 'large'}
      />
    );
  }
  return (
    <Box
      a11yTitle={`View details of ${equity.symbol} ticker`}
      gap='small'
      direction='row'
      align='center'
      flex={false}
      responsive={false}
      {...rest}
    >
      {image}
      {link}
    </Box>
  );
};


Equity.defaultProps = {
  equity: undefined,
  level: 3,
  showName: false,
};

Equity.propTypes = {
  equity: PropTypes.object.isRequired,
  level: PropTypes.number,
  showName: PropTypes.bool,
};

export default Equity;

