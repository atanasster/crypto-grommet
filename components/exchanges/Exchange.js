import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box, Heading } from 'grommet';
import RoutedAnchor from '../RoutedAnchor';
import Entity from '../entities/Entity';
import { exchangeInfoQuery } from '../../graphql/exchanges';

export const CountryFlag = ({ code }) => (
  <RoutedAnchor route='exchange_by_country' params={{ country: code }} >
    {code}
  </RoutedAnchor>
);


export const Country = ({ code, name = 'all countries', level = 4 }) => (
  <Box direction='row' align='center' pad={{ horizontal: 'small' }}>
    <CountryFlag code={code} />
    <Box pad={{ horizontal: 'small' }}>
      <Heading margin='xsmall' level={level}>{name}</Heading>
    </Box>
  </Box>
);

export const ExchangeCountries = ({ countries }) => (
  countries.map(country => (
    <Box key={`country_${country.code}`} margin={{ horizontal: 'xsmall' }} border='all' alignSelf='center'>
      <CountryFlag code={country.code} />
    </Box>
  ))
);


export const ConnectedExchange = ({
  size, display, exchange,
}) => (exchange ? (
  <RoutedAnchor route='exchange_info' params={{ exchange: exchange.name }} >
    <Entity
      entity={exchange.name === 'CCCAGG' ? { ...exchange, name: 'Aggregated' } : exchange}
      size={size}
      display={display}
      type='exchange'
    />
  </RoutedAnchor>
) : null
);

ConnectedExchange.defaultProps = {
  size: 'large',
  exchange: undefined,
  display: ['image', 'name'],
};

ConnectedExchange.propTypes = {
  exchange: PropTypes.object,
  size: PropTypes.string,
  display: PropTypes.arrayOf(PropTypes.oneOf(['name', 'symbol', 'image'])),
};


// eslint-disable-next-line no-unused-vars
const Exchange = ({ exchange: sExchange, data: { coinExchange }, rest }) => (
  <ConnectedExchange exchange={coinExchange} {...rest} />
);

Exchange.propTypes = {
  exchange: PropTypes.string.isRequired,
};

export default graphql(exchangeInfoQuery, {
  options: props => ({ variables: { exchange: props.exchange } }),
})(
  Exchange
);

