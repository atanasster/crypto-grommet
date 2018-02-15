import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Flag from 'react-world-flags';
import { Box, Image, Heading, RoutedAnchor } from 'grommet';

export const CountryFlag = ({ code, height = 12 }) => (
  <Flag
    code={code}
    height={height}
  />
);


export const Country = ({ code, name = 'all countries', level = 4 }) => (
  <Box direction='row' align='center' >
    <CountryFlag code={code} />
    <Box pad={{ horizontal: 'small' }}>
      <Heading margin='xsmall' level={level}>{name}</Heading>
    </Box>
  </Box>
);

export const ExchangeCountries = ({ countries }) => (
  countries.map(code => (
    <Box key={`country_${code}`} margin={{ right: 'xsmall' }} border='all' alignSelf='center'>
      <CountryFlag code={code} />
    </Box>
  ))
);


const Exchange = ({ exchangeObj, level, exchange, aggregatedExchange, border }) => {
  if (!exchange) {
    return null;
  }
  const exchangeName = exchange === aggregatedExchange ? 'Aggregated' : exchange;
  let image;
  if (exchangeObj) {
    image = (
      <Box margin={{ horizontal: 'small' }}>
        <Image
          src={exchangeObj.logo}
          style={{
            height: level > 2 ? '24px' : '34px',
          }}
        />
      </Box>
    );
  }
  return (
    <Box
      a11yTitle={`View details of ${exchangeName} exchange`}
      border={border}
      direction='row'
      align='center'
    >
      {image}
      <RoutedAnchor path={`/exchanges/prices/${exchange}`}>
        <Heading level={level} margin='none'><strong>{exchangeName}</strong></Heading>
      </RoutedAnchor>
    </Box>
  );
};

const mapStateToProps = (state, props) => ({
  exchangeObj: state.exchanges.all[props.exchange],
  aggregatedExchange: state.settings.aggregatedExchange,
});


const ConnectedExchange = connect(mapStateToProps)(Exchange);

Exchange.defaultProps = {
  level: 4,
  border: undefined,
  exchange: undefined,
};

Exchange.propTypes = {
  exchange: PropTypes.string,
  level: PropTypes.number,
  border: PropTypes.string,
};

export default ConnectedExchange;
