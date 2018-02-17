import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Image, Text, RoutedAnchor, Heading } from 'grommet';
import numeral from 'numeral';

const FormattedValue = ({ value, toSymbol, coin, large, justify, level }) => {
  let format = (coin && !large) ? '0,0.00000000' : '0,0.00';
  if (large) {
    format = `${format}a`;
  }
  return (
    <Box direction='row' align='baseline' gap='xsmall' justify={justify}>
      <Heading margin='none' level={level}>
        {numeral(value).format(format)}
      </Heading>
      <Text size='xsmall'>
        {toSymbol}
      </Text>

    </Box>
  );
};

FormattedValue.defaultProps = {
  large: false,
  justify: 'end',
  level: 4,
};

FormattedValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  toSymbol: PropTypes.string.isRequired,
  large: PropTypes.bool,
  justify: PropTypes.string,
  level: PropTypes.number,
};
const mapValueStateToProps = (state, props) => ({
  coin: state.coins.all[props.toSymbol],
});


export const FormattedCoinValue = connect(mapValueStateToProps)(FormattedValue);

export const valueToColor = (value) => {
  if (value > 0) {
    return 'status-ok';
    // eslint-disable-next-line no-bitwise
  } else if (value < 0) {
    return 'status-critical';
  }
  return 'status-warning';
};


export const ColoredPercentChange = ({ value, size = 'medium' }) => (
  <Text size={size} color={valueToColor(value)} >
    {numeral(value).format('0,0.00%')}
  </Text>
);

const Coin = (
  { coin, exchange, defaultExchange, symbol, toSymbol, level, border, aggregatedExchange, short }
) => {
  const coinName = (coin && !short) ? coin.fullName : symbol;
  const textLevel = short ? 4 : level;
  const title = <Heading level={textLevel} margin='none'>{coinName}</Heading>;
  const link = coin ? (
    <RoutedAnchor
      path={`/coins/general/${symbol}/${toSymbol}/${exchange === aggregatedExchange ? defaultExchange : exchange}`}
    >
      {title}
    </RoutedAnchor>
  ) : title;
  let image;
  if (coin && !short) {
    image = (
      <Box margin={{ right: 'small' }}>
        <Image
          src={coin.imageUrl}
          style={{ width: textLevel > 2 ? '24px' : '34px', height: textLevel > 2 ? '24px' : '34px' }}
        />
      </Box>
    );
  }
  return (
    <Box
      a11yTitle={`View details of ${coinName} coin`}
      border={border}
      direction='row'
      align='center'
    >
      {image}
      {link}
    </Box>
  );
};


const mapStateToProps = (state, props) => ({
  coin: state.coins.all[props.symbol],
  defaultExchange: state.settings.defaultExchange,
  aggregatedExchange: state.settings.aggregatedExchange,
});


const ConnectedCoin = connect(mapStateToProps)(Coin);

Coin.defaultProps = {
  level: 3,
  border: 'bottom',
  toSymbol: undefined,
  exchange: undefined,
  short: false,
};

Coin.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string,
  exchange: PropTypes.string,
  level: PropTypes.number,
  border: PropTypes.string,
  short: PropTypes.bool,
};

export default ConnectedCoin;


export const CoinToCoin = ({ symbol, toSymbol, exchange }) => (
  <Box align='center' border='bottom'>
    <ConnectedCoin
      symbol={symbol}
      toSymbol={toSymbol}
      exchange={exchange}
      border={null}
    />
    <ConnectedCoin
      symbol={toSymbol}
      toSymbol={symbol}
      exchange={exchange}
      level={4}
      border={null}
    />
  </Box>
);

CoinToCoin.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
};
