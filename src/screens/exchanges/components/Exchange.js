import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Image, Heading, RoutedAnchor } from 'grommet';
import { withTheme } from 'grommet/components/hocs';
import Flag from '../../../components/utils/Flag';

export const CountryFlag = ({ code, height = 12 }) => (
  <Flag
    code={code}
    height={height}
  />
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
  countries.map(code => (
    <Box key={`country_${code}`} margin={{ horizontal: 'xsmall' }} border='all' alignSelf='center'>
      <CountryFlag code={code} />
    </Box>
  ))
);


const Exchange = ({ exchangeObj, level, exchange, aggregatedExchange, border, justify }) => {
  if (!exchange) {
    return null;
  }
  const exchangeName = exchange === aggregatedExchange ? 'Aggregated' : exchange;
  let image;
  if (exchangeObj) {
    image = (
      <Image
        src={exchangeObj.logo}
        style={{
          height: level > 2 ? '24px' : '34px',
        }}
      />
    );
  }
  return (
    <Box
      a11yTitle={`View details of ${exchangeName} exchange`}
      border={border}
      direction='row'
      align='center'
      justify={justify}
      gap='xsmall'
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


const ConnectedExchange = withTheme(connect(mapStateToProps)(Exchange));

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
