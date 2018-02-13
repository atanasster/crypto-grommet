import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import Page from './Page';
import { NavAnchor } from '../TopMenu';
import Coin from '../Coin';

const CoinPage = ({ children, symbol, toSymbol, exchange, coin }) => (
  <Page
    name={<Coin symbol={symbol} toSymbol={toSymbol} exchange={exchange} border={null} level={2} />}
    messages={coin ? coin.messages : undefined}
    description={coin ? coin.description : undefined}
  >
    <Box direction='row' align='center'>
      <NavAnchor
        path={`/coins/general/${symbol}/${toSymbol}/${exchange}`}
        label='General'
      />
      <NavAnchor
        path={`/coins/social/${symbol}/${toSymbol}/${exchange}`}
        label='Social'
      />
      <NavAnchor
        path={`/coins/chart/${symbol}/${toSymbol}/${exchange}`}
        label='Chart'
      />
      <NavAnchor
        path={`/coins/order_book/${symbol}/${toSymbol}/${exchange}`}
        label='Order books'
      />
    </Box>
    <Box align='center'>
      {children}
    </Box>
  </Page>
);

const mapStateToProps = (state, props) => ({
  coin: state.coins.all[props.symbol],
});

export default connect(mapStateToProps)(CoinPage);
