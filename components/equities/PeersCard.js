import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box } from 'grommet';
import { Card } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import Equity from './Equity';
// import PriceChart from './PriceChart';
import { equityPeersQuery } from '../graphql/equities';


class PriceCard extends Component {
  renderPeers = (peers) => {
    const { symbol } = this.props;
    if (!peers) {
      return null;
    }
    return peers.map(item => (
      <Equity
        key={`peers_${symbol}_${item.peer.symbol}`}
        border='bottom'
        pad='small'
        equity={item.peer}
        level={4}
        showName={true}
      />
    ));
  };

  render() {
    const {
      data: { equity },
    } = this.props;
    if (!equity) {
      return null;
    }
    return (
      <Card>
        <CardTitle border='bottom'>
          <Equity equity={equity} />
        </CardTitle>
        <CardSubTitle border='bottom'>
          Company peers
        </CardSubTitle>
        <CardContent >
          <Box full='horizontal' pad='small' >
            {this.renderPeers(equity.peers)}
          </Box>
        </CardContent>
      </Card>
    );
  }
}
PriceCard.defaultProps = {
  symbol: 'AAPL',
};

PriceCard.propTypes = {
  symbol: PropTypes.string,
};


export default graphql(equityPeersQuery, {
  options: props => (
    { variables: { symbol: props.symbol } }),
})(PriceCard);
