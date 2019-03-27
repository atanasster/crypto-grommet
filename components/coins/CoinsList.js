import React from 'react';
import PropTypes from 'prop-types';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import Coin from './Coin';
import CoinDashboard from './CoinDashboard';
import { allCoinsQuery } from '../../graphql/coins';
import { FormattedCoinValue, ColoredPercentChange } from '../utils/formatters';
import RoutedAnchor from '../RoutedAnchor';

class CoinsList extends React.Component {
  onExpand = ({ row }) => {
    const { exchange, currency } = this.props;
    return (
      <CoinDashboard
        symbol={row.symbol}
        toSymbol={currency}
        exchange={exchange}
      />
    );
  };

  render() {
    const {
      exchange, data, loadMoreEntries, algorithm, proofType,

    } = this.props;
    const columns = [
      {
        title: 'Coin',
        name: 'symbol',
        formatter: ({ row }) => (
          <Coin
            coin={row}
            toCoin={{ symbol: 'USD' }}
            exchange={exchange}
            level={4}
            border={null}
          />
        ),
      }, {
        title: 'Market cap',
        name: 'stats.marketCap',
        formatter: ({ value, row }) => (
          <FormattedCoinValue
            value={value}
            coin={row}
            large={true}
          />
        ),
        align: 'right',
      }, {
        title: 'Algo',
        name: 'algorithm.name',
        formatter: ({ value }) => (value ? (
          <RoutedAnchor route='coins_by_algo' params={{ algorithm: value }} >
            {value}
          </RoutedAnchor>
        ) : null
        ),
      }, {
        title: 'Proof',
        name: 'proofType.name',
        formatter: ({ value }) => (value ? (
          <RoutedAnchor route='coins_by_prooftype' params={{ proofType: value }} >
            {value}
          </RoutedAnchor>
        ) : null
        ),
      },
      {
        title: 'Price',
        name: 'stats.price',
        formatter: ({ value, row }) => (<FormattedCoinValue value={value} coin={row.coin} />),
        align: 'right',
      }, {
        title: '%7d',
        name: 'stats.percentChange7d',
        formatter: ({ value }) => (<ColoredPercentChange value={value / 100} />),
        align: 'right',
      }, {
        title: 'Circulation',
        name: 'stats.availableSupply',
        formatter: ({ value, row }) => (
          <FormattedCoinValue value={value} coin={row.coin} large={true} />
        ),
        align: 'right',
      }, {
        title: 'Total',
        name: 'stats.totalSupply',
        formatter: ({ value, row }) => (
          <FormattedCoinValue value={value} coin={row.coin} large={true} />
        ),
        align: 'right',
      },
    ];
    return (
      <PagingGraphqlList
        columns={columns}
        loadMoreEntries={loadMoreEntries}
        data={data}
        onExpand={this.onExpand}
        aliases={{ 'stats': 'tickers_coinkeystats', 'symbol': 'slug' }}
        sorting={[{ columnName: 'stats.marketCap', direction: 'desc' }]}
        gqlProps={{
 hasMarketCap: true, hasICO: false, algorithm, proofType,
}}
      />
    );
  }
}

CoinsList.defaultProps = {
  algorithm: undefined,
  proofType: undefined,
};
CoinsList.propTypes = {
  currency: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
  algorithm: PropTypes.string,
  proofType: PropTypes.string,
};

export default withGraphQLList(allCoinsQuery, CoinsList);

