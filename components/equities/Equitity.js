import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { ImageStamp } from 'grommet-controls';
import RoutedAnchor from '../RoutedAnchor';
import routerPush from '../Router';

export const EquityPath = ({
  symbol, children,
}) => (
  <RoutedAnchor route='equities_info' params={{ symbol }} >
    {children}
  </RoutedAnchor>
);

export const pushEquityPath = ({ symbol }) => {
  routerPush({ route: 'equities_info', params: { symbol } });
};
const Equity = ({ equity, level }) => {
  let name;
  if (equity) {
    name = equity.symbol;
  } else {
    name = '';
  }
  const title = <Heading level={level} margin='none'>{name}</Heading>;
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
      a11yTitle={`View details of ${name} ticker`}
      gap='small'
      direction='row'
      align='center'
      flex={false}
      responsive={false}
    >
      {image}
      {link}
    </Box>
  );
};


Equity.defaultProps = {
  equity: undefined,
  level: 3,
};

Equity.propTypes = {
  equity: PropTypes.object,
  level: PropTypes.number,
};

export default Equity;

