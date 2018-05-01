import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box, Heading } from 'grommet';
import { ImageStamp } from 'grommet-controls';
import RoutedAnchor from '../RoutedAnchor';
import { exchangeInfoQuery } from '../graphql/exchanges';

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
  level, exchange, aggregatedExchange, ...rest
}) => {
  if (!exchange) {
    return null;
  }
  let image;
  if (exchange) {
    image = (
      <ImageStamp
        src={exchange.image}
        size={level > 2 ? 'medium' : 'large'}
      />
    );
  }
  return (
    <Box
      a11yTitle={`View details of ${exchange.name} exchange`}
      direction='row'
      align='center'
      gap='xsmall'
      {...rest}
    >
      {image}
      <RoutedAnchor route='exchange_prices' params={{ exchange: exchange.name }} >
        <Heading level={level} margin='none'><strong>{exchange.name === 'CCCAGG' ? 'Aggregated' : exchange.name}</strong></Heading>
      </RoutedAnchor>
    </Box>
  );
};

ConnectedExchange.defaultProps = {
  level: 3,
  exchange: undefined,
};

ConnectedExchange.propTypes = {
  exchange: PropTypes.object,
  level: PropTypes.number,
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

