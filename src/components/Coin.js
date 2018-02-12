import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Image, Text, RoutedAnchor, Heading } from 'grommet';
import numeral from 'numeral';

export const FormattedCoinValue = ({ value, toSymbol }) => (
  <Box direction='row' align='baseline'>
    <Text>
      {numeral(value).format('0,0.00')}
    </Text>
    <Text size='xsmall'>
      {toSymbol}
    </Text>

  </Box>
);

const Coin = (
  { coin, exchange, defaultExchange, symbol, toSymbol, level, border, aggregatedExchange }
) => {
  const title = <Heading level={level} margin='none'>{coin ? coin.fullName : symbol}</Heading>;
  const link = coin ? (
    <RoutedAnchor
      path={`/coins/info/${symbol}/${toSymbol}/${exchange === aggregatedExchange ? defaultExchange : exchange}`}
    >
      {title}
    </RoutedAnchor>
  ) : title;
  let image;
  if (coin) {
    image = (
      <Box margin='small'>
        <Image src={coin.imageUrl} style={{ width: '34px', height: '34px' }} />
      </Box>
    );
  }
  return (
    <Box border={border} direction='row' align='center'>
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
  level: 2,
  border: 'bottom',
};

Coin.propTypes = {
  symbol: PropTypes.string.isRequired,
  toSymbol: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
  level: PropTypes.number,
  border: PropTypes.string,
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
