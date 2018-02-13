import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import CoinPage from '../../components/pages/CoinPage';
import TwitterTimeline from '../../components/TwitterTimeline';

class CoinSocial extends Component {
  render() {
    const { symbol, toSymbol, exchange } = this.props.match.params;
    const { coin } = this.props;
    let twitterCard;
    console.log(coin);
    if (coin && coin.twitter) {
      twitterCard = (
        <Box basis='1/3'>
          <TwitterTimeline user={coin.twitter.replace(/^@/, '')} />
        </Box>
      );
    }
    return (
      <CoinPage symbol={symbol} toSymbol={toSymbol} exchange={exchange}>
        <Box direction='row' full='horizontal' pad={{ vertical: 'small' }} >
          {twitterCard}
        </Box>
      </CoinPage>
    );
  }
}

const mapStateToProps = (state, props) => ({
  coin: state.coins.all[props.match.params.symbol],
});

export default connect(mapStateToProps)(CoinSocial);
