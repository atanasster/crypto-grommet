import React from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import CardScroll from './CardScroll';
import PriceCard from './cards/PriceCard';

const FavoritePrices = ({ favCoins, exchange }) => {
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
      <CardScroll>
        {cards}
      </CardScroll>
    </Box>
  );
};

const mapStateToProps = state => ({
  favCoins: state.settings.favCoins,
});

export default connect(mapStateToProps)(FavoritePrices);
