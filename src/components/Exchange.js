import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Flag from 'react-world-flags';
import { Box, Image, Heading, RoutedAnchor } from 'grommet';

export const ExchangeCountries = ({ countries }) => (
  countries.map(code => (
    <Box key={`country_${code}`} margin={{ right: 'xsmall' }} border='all' alignSelf='center'>
      <Flag
        code={code}
        height={12}
      />
    </Box>
  ))
);


const Exchange = ({ exchangeObj, level, exchange, aggregatedExchange, border }) => {
  const exchangeName = exchange === aggregatedExchange ? 'Aggregated' : exchange;
  return (
    <Box border={border} direction='row' align='center'>
      {exchangeObj ? (<Box margin='small'>
        <Image
          src={exchangeObj.logo}
          style={{
            width: '24px',
            height: '24px',
          }}
        />
      </Box>) : null}
      <RoutedAnchor path={`/exchanges/${exchange}`}>
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
};

Exchange.propTypes = {
  exchange: PropTypes.string.isRequired,
  level: PropTypes.number,
  border: PropTypes.string,
};

export default ConnectedExchange;
