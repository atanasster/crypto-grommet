import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Box } from 'grommet';
import { Card, PagingTable } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import { PercentValue, LargeValue } from '../utils/formatters';
import Equity from './Equity';
import { volumeByVenueQuery, equityInfoQuery } from '../graphql/equities';


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
      info: { equity }, data: { equityVolumeByExchange },
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
          Volume by venue
        </CardSubTitle>
        <CardContent >
          {equityVolumeByExchange &&
          <Box full='horizontal' pad='small' >
            <PagingTable
              decorations={{
                rowOdd: { background: { color: 'light-1' } },
              }}
              columns={[
                {
                  Header: 'Venue',
                  accessor: 'venueName',
                  decorations: {
                    cell: {
                      truncate: true,
                    },
                  },
                },
                {
                  Header: 'Venue %',
                  accessor: 'marketPercent',
                  Cell: cell => (<PercentValue value={cell.value / 100} decimals={4} />),
                  getProps: () => ({ align: 'end' }),
                }, {
                  Header: 'Volume',
                  accessor: 'volume',
                  Cell: cell => (<LargeValue value={cell.value} />),
                  getProps: () => ({ align: 'end' }),
                },
              ]}
              data={equityVolumeByExchange}
              defaultSorted={[{ id: 'marketPercent', desc: true }]}
            />
          </Box>
            }
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


export default compose(
  graphql(equityInfoQuery, { name: 'info', options: props => ({ variables: { symbol: props.symbol } }) }),
  graphql(volumeByVenueQuery, { name: 'data', options: props => ({ variables: { symbol: props.symbol } }) })
)(PriceCard);
