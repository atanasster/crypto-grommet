import React from 'react';
import PropTypes from 'prop-types';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import CardScroll from '../CardScroll';
import Coin, { FormattedCoinValue, ColoredPercentChange } from './Coin';
import PriceCard from './PriceCard';
import OrderBookCard from './OrderBookCard';
import { allCoinsQuery } from '../graphql/coins';
import RoutedAnchor from '../RoutedAnchor';

class CoinsList extends React.Component {
  onExpand = (row) => {
    const { exchange, currency } = this.props;
    return (
      <CardScroll>
        <PriceCard
          symbol={row.original.symbol}
          toSymbol={currency}
          exchange={exchange}
        />
        <OrderBookCard
          symbol={row.original.symbol}
          toSymbol={currency}
          exchange={exchange}
        />
      </CardScroll>
    );
  };

  render() {
    const {
      exchange, data, loadMoreEntries, algorithm, proofType,

    } = this.props;
    const columns = [
      {
        Header: 'Coin',
        accessor: 'symbol',
        Cell: cell => (
          <Coin
            coin={cell.original}
            toCoin={{ symbol: 'USD' }}
            exchange={exchange}
            level={4}
            border={null}
          />
        ),
      }, {
        Header: 'Market cap',
        accessor: 'stats.marketCap',
        maxWidth: 150,
        Cell: cell => (
          <FormattedCoinValue
            value={cell.value}
            coin={cell.original}
            large={true}
          />
        ),
        getProps: () => ({ align: 'end' }),
      }, {
        Header: 'Algo',
        accessor: 'algorithm.name',
        Cell: cell => (cell.value && (
          <RoutedAnchor route='coins_by_algo' params={{ algorithm: cell.value }} >
            {cell.value}
          </RoutedAnchor>
        )
        ),
      }, {
        Header: 'Proof',
        accessor: 'proofType.name',
        Cell: cell => (cell.value && (
          <RoutedAnchor route='coins_by_prooftype' params={{ proofType: cell.value }} >
            {cell.value}
          </RoutedAnchor>
        )
        ),
      },
      {
        Header: 'Price',
        accessor: 'stats.price',
        maxWidth: 120,
        Cell: cell => (<FormattedCoinValue value={cell.value} coin={cell.original.coin} />),
        getProps: () => ({ align: 'end' }),
      }, {
        Header: '%7d',
        accessor: 'stats.percentChange7d',
        maxWidth: 120,
        Cell: cell => (<ColoredPercentChange value={cell.value / 100} />),
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: 'Circulation',
        accessor: 'stats.availableSupply',
        Cell: cell => (
          <FormattedCoinValue value={cell.value} coin={cell.original.coin} large={true} />
        ),
        getProps: () => ({ textAlign: 'end' }),
      }, {
        Header: 'Total',
        accessor: 'stats.totalSupply',
        Cell: cell => (
          <FormattedCoinValue value={cell.value} coin={cell.original.coin} large={true} />
        ),
        getProps: () => ({ textAlign: 'end' }),
      },
    ];
    return (
      <PagingGraphqlList
        columns={columns}
        loadMoreEntries={loadMoreEntries}
        data={data}
        onExpand={this.onExpand}
        aliases={{ 'stats': 'tickers_coinkeystats' }}
        ordering={[{ id: 'stats.marketCap', desc: true }]}
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

