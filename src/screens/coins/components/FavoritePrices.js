import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import CardScroll from '../../../components/CardScroll';
import PriceCard from './PriceCard';

const FavoritePrices = ({ favCoins, exchange, responsive }) => {
  const cards = favCoins.map((pair, index) => {
    const colors = [
      'brand', 'accent-1', 'accent-2', 'neutral-1', 'neutral-2', 'neutral-3', 'status-ok', 'status-warning',
    ];
    const colorIdx = index % colors.length;
    return (
      <PriceCard
        key={`history_${index}`}
        color={colors[colorIdx]}
        symbol={pair.symbol}
        toSymbol={pair.toSymbol}
        exchange={exchange}
      />
    );
  });
  return (
    <Box margin={{ bottom: 'xsmall' }} pad='xsmall' align='center'>
      <CardScroll responsive={responsive}>
        {cards}
      </CardScroll>
    </Box>
  );
};

const mapStateToProps = state => ({
  favCoins: state.settings.favCoins,
  responsive: state.nav.responsive,
});

export default connect(mapStateToProps)(FavoritePrices);
