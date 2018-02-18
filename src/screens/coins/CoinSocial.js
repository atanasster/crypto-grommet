import React, { Component } from 'react';
import { Box } from 'grommet';
import CardScroll from '../../components/CardScroll';
import CoinPage from '../../components/pages/CoinPage';
import TwitterTimeline from '../../components/TwitterTimeline';

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
      <CoinPage>
        {coinProps => (
          <CardScroll >
            {renderTwitterCard(coinProps)}
          </CardScroll>
        )}
      </CoinPage>
    );
  }
}
