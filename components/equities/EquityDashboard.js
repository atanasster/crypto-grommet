import React from 'react';
import PropTypes from 'prop-types';
import CardScroll from '../CardScroll';
import PriceCard from './PriceCard';
import StatsCard from './StatsCard';
import InfoCard from './InfoCard';
import PeersCard from './PeersCard';
import VolumeByExchangeCard from './VolumeByExchangeCard';

const EquityDashboard = ({ symbol }) => (
  <CardScroll>
    <PriceCard symbol={symbol} />
    <InfoCard symbol={symbol} />
    <StatsCard symbol={symbol} />
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
