import React from 'react';
import PropTypes from 'prop-types';
import CardScroll from '../CardScroll';
import PriceCard from './PriceCard';
import PeersCard from './PeersCard';
import VolumeByExchangeCard from './VolumeByExchangeCard';

const EquityDashboard = ({ symbol }) => (
  <CardScroll>
    <PriceCard symbol={symbol} />
    <PeersCard symbol={symbol} />
    <VolumeByExchangeCard symbol={symbol} />
  </CardScroll>
);

EquityDashboard.defaultProps = {
  symbol: undefined,
};

EquityDashboard.propTypes = {
  symbol: PropTypes.string,
};

export default EquityDashboard;
