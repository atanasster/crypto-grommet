import React, { Component } from 'react';
import { Box } from 'grommet';
import CoinPage from '../../components/pages/CoinPage';
import TwitterTimeline from '../../components/TwitterTimeline';

function renderTwitterCard(coinProps) {
  const { coin } = coinProps;
  if (coin && coin.twitter) {
    return (
      <Box basis='1/3'>
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
          <Box direction='row' fill='horizontal' pad={{ vertical: 'small' }} >
            {renderTwitterCard(coinProps)}
          </Box>
        )}
      </CoinPage>
    );
  }
}
