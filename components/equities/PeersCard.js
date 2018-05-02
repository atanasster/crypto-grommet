import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box } from 'grommet';
import { Card, PagingTable } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import Equity from './Equity';
import { equityPeersQuery } from '../graphql/equities';


class PriceCard extends Component {
  renderPeers = (peers) => {
    if (!peers) {
      return null;
    }
    return (
      <PagingTable
        resizable={false}
        decorations={{
          rowOdd: { background: { color: 'light-1' } },
        }}
        columns={[
          {
            Header: 'Similar companies',
            accessor: 'symbol',
            Cell: cell => (
              <Equity
                equity={cell.original.peer}
                showName={true}
                level={4}
              />
            ),
          },
        ]}
        data={peers}
      />
    );
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
  // eslint-disable-next-line react/no-unused-prop-types
  symbol: PropTypes.string,
};


export default graphql(equityPeersQuery, {
  options: props => (
    { variables: { symbol: props.symbol } }),
})(PriceCard);
