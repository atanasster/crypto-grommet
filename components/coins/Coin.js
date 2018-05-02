import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { ImageStamp } from 'grommet-controls';
import RoutedAnchor from '../RoutedAnchor';
import connect from '../../redux/index';
import routerPush from '../Router';

export const hasICO = coin => (coin && coin.icoStatus && coin.icoStatus !== 'Finished');

export const CoinPath = ({
  symbol, toSymbol, exchange, children,
}) => (
  <RoutedAnchor route='coin_info' params={{ symbol, toSymbol, exchange }} >
    {children}
  </RoutedAnchor>
);

export const pushCoinPath = ({ symbol, toSymbol, exchange }) => {
  routerPush({ route: 'coin_info', params: { symbol, toSymbol, exchange } });
};
const Coin = (
  {
    coin, exchange, defaultExchange, toCoin, level, aggregatedExchange,
    short, defaultCurrency,
  }
) => {
  let coinName;
  if (coin) {
    coinName = (coin.name && !short) ? coin.name : coin.symbol;
  } else {
    coinName = '';
  }
  const textLevel = short ? 4 : level;
  const toCurrency = toCoin || { symbol: defaultCurrency };
  const title = <Heading level={textLevel} margin='none'>{coinName}</Heading>;
  const link = coin && coin.name ? (
    <CoinPath
      symbol={coin.symbol}
      toSymbol={toCurrency.symbol}
      exchange={exchange === aggregatedExchange ? defaultExchange : exchange}
    >
      {title}
    </CoinPath>
  ) : title;
  let image;
  if (coin && coin.image && !short) {
    image = (
      <ImageStamp
        src={coin.image}
        size={textLevel > 2 ? 'medium' : 'large'}
      />
    );
  }
  return (
    <Box
      a11yTitle={`View details of ${coinName} coin`}
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


const mapStateToProps = (state, props) => ({
  defaultExchange: state.settings.defaultExchange,
  aggregatedExchange: state.settings.aggregatedExchange,
  exchange: props.exchange || state.settings.defaultExchange,
  defaultCurrency: state.settings.defaultCurrency,
});


const ConnectedCoin = connect(mapStateToProps)(Coin);

Coin.defaultProps = {
  level: 3,
  coin: undefined,
  toCoin: undefined,
  exchange: undefined,
  short: false,
};

Coin.propTypes = {
  coin: PropTypes.object,
  toCoin: PropTypes.object,
  exchange: PropTypes.string,
  level: PropTypes.number,
  short: PropTypes.bool,
};

export default ConnectedCoin;


export const CoinToCoin = ({ coin, toCoin, exchange }) => (
  <Box align='center' fill='hoizontal'>
    <ConnectedCoin
      coin={coin}
      toCoin={toCoin}
      exchange={exchange}
    />
    <ConnectedCoin
      coin={toCoin}
      toCoin={coin}
      exchange={exchange}
      level={4}
    />
  </Box>
);

CoinToCoin.propTypes = {
  coin: PropTypes.object.isRequired,
  toCoin: PropTypes.object.isRequired,
  exchange: PropTypes.string.isRequired,
};

