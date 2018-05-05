import React from 'react';
import PropTypes from 'prop-types';
import RoutedAnchor from '../RoutedAnchor';
import routerPush from '../Router';
import Entity from '../entities/Entity';

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
  equity, size, display,
}) => (equity ? (
  <EquityPath
    symbol={equity.symbol}
  >
    <Entity
      entity={equity}
      size={size}
      display={display}
      type='equity'
    />
  </EquityPath>
) : null);


Equity.defaultProps = {
  equity: undefined,
  size: 'medium',
  display: ['image', 'symbol'],
};

Equity.propTypes = {
  equity: PropTypes.object.isRequired,
  size: PropTypes.string,
  display: PropTypes.arrayOf(PropTypes.oneOf(['name', 'symbol', 'image'])),
};

export default Equity;

