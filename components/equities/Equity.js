import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import RoutedAnchor from '../RoutedAnchor';
import routerPush from '../Router';
import Entity from '../entities/Entity';
import { equityInfoQuery } from '../graphql/equities';


export const EquityPath = ({
  symbol, children, disableLink,
}) => (disableLink ? <div>{children}</div> : (
  <RoutedAnchor route='equity_info' params={{ symbol }} >
    {children}
  </RoutedAnchor>
));

export const pushEquityPath = ({ symbol }) => {
  routerPush({ route: 'equity_info', params: { symbol } });
};
const Equity = ({
  equity, size, display, disableLink,
}) => (equity ? (
  <EquityPath
    disableLink={disableLink}
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
  equity: PropTypes.object,
  size: PropTypes.string,
  display: PropTypes.arrayOf(PropTypes.oneOf(['name', 'symbol', 'image'])),
};

export default Equity;

export const EquityGQL = graphql(equityInfoQuery, {
  options: props => ({ variables: { symbol: props.symbol } }),
})(
  ({ data, ...rest }) => (
    <Equity equity={data.equity} {...rest} />
  )
);

EquityGQL.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  symbol: PropTypes.string.isRequired,
};

