import React, { Component } from 'react';
import { Box } from 'grommet';
import CardScroll from '../../components/CardScroll';
import TwitterTimeline from './components/TwitterTimeline';

function renderTwitterCard(coinProps) {
  const { coin } = coinProps;
  if (coin && coin.twitter) {
    return (
      <Box>
        <TwitterTimeline user={coin.twitter.replace(/^@/, '')} />
      </Box>
    );
  }
  return null;
}

export default class CoinSocial extends Component {
  render() {
    return (
      <CardScroll >
        {renderTwitterCard(this.props)}
      </CardScroll>
    );
  }
}
