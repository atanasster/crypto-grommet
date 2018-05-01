import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Heading } from 'grommet';
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
const Equity = ({ equity }) => {
  let name;
  if (equity) {
    name = equity.slug;
  } else {
    name = '';
  }
  const title = <Heading level={4} margin='none'>{name}</Heading>;
  const link = equity && equity.slug ? (
    <EquityPath
      symbol={equity.slug}
    >
      {title}
    </EquityPath>
  ) : title;
  let image;
  if (equity && equity.image) {
    image = (
      <Image
        src={equity.image}
        style={{ width: '24px', height: '24px' }}
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
};

Equity.propTypes = {
  equity: PropTypes.object,
};

export default Equity;

