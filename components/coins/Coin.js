import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box } from 'grommet';
import RoutedAnchor from '../RoutedAnchor';
import connect from '../../redux/index';
import routerPush from '../Router';
import { coinInfoQuery } from '../../graphql/coins';
import Entity from '../entities/Entity';

export const hasICO = coin => (coin && coin.icoStatus && coin.icoStatus !== 'Finished');

export const CoinPath = ({
  symbol, toSymbol, exchange, children, disableLink,
}) => (
  disableLink ? (<div>{children}</div>) : (
    <RoutedAnchor
      route='coin_info'
      params={{
       symbol, toSymbol, exchange, page: 'info',
      }}
    >
      {children}
    </RoutedAnchor>
  )
);

export const pushCoinPath = ({ symbol, toSymbol, exchange }) => {
  routerPush({
    route: 'coin_info',
    params: {
      symbol, toSymbol, exchange, page: 'info',
    },
  });
};
const Coin = (
  {
    coin, exchange, defaultExchange, toCoin, size, aggregatedExchange,
    display, defaultCurrency, disableLink,
  }
) => (coin ? (
  <CoinPath
    disableLink={disableLink}
    symbol={coin.symbol}
    toSymbol={toCoin ? toCoin.symbol : defaultCurrency}
    exchange={exchange === aggregatedExchange ? defaultExchange : exchange}
  >
    <Entity
      entity={coin}
      size={size}
      display={display}
      type='coin'
    />
  </CoinPath>
) : null
);


const mapStateToProps = (state, props) => ({
  defaultExchange: state.settings.defaultExchange,
  aggregatedExchange: state.settings.aggregatedExchange,
  exchange: props.exchange || state.settings.defaultExchange,
  defaultCurrency: state.settings.defaultCurrency,
});


const ConnectedCoin = connect(mapStateToProps)(Coin);

Coin.defaultProps = {
  size: undefined,
  coin: undefined,
  toCoin: undefined,
  exchange: undefined,
  display: ['image', 'name', 'symbol'],
};

Coin.propTypes = {
  coin: PropTypes.object,
  toCoin: PropTypes.object,
  exchange: PropTypes.string,
  size: PropTypes.string,
  display: PropTypes.arrayOf(PropTypes.oneOf(['name', 'symbol', 'image'])),
};

export default ConnectedCoin;


export const CoinToCoin = ({ coin, toCoin, exchange }) => (
  <Box align='center' fill='hoizontal'>
    <ConnectedCoin
      coin={coin}
      toCoin={toCoin}
      exchange={exchange}
      size='large'
    />
    <ConnectedCoin
      coin={toCoin}
      toCoin={coin}
      exchange={exchange}
      display={['symbol']}
    />
  </Box>
);

CoinToCoin.propTypes = {
  coin: PropTypes.object.isRequired,
  toCoin: PropTypes.object.isRequired,
  exchange: PropTypes.string.isRequired,
};

export const CoinGQL = graphql(coinInfoQuery, {
  options: props => ({ variables: { symbol: props.symbol } }),
})(
  ({ data, ...rest }) => (
    <ConnectedCoin coin={data.coin} {...rest} />
  )
);

CoinGQL.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  symbol: PropTypes.string.isRequired,
};

