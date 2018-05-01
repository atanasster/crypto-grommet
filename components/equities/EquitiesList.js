import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardScroll from '../CardScroll';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import { FormattedCoinValue, ColoredPercentChange } from '../coins/Coin';
import RoutedAnchor from '../RoutedAnchor';
import PriceCard from './PriceCard';
import PeersCard from './PeersCard';
import Equity from './Equity';
import { allEquitiesQuery } from '../graphql/equities';

class EquitiesList extends Component {
  onExpand = row => (
    <CardScroll>
      <PriceCard symbol={row.original.symbol} />
      <PeersCard symbol={row.original.symbol} />
    </CardScroll>
  );
  render() {
    const {
      data, loadMoreEntries, exchange, industry, sector,
    } = this.props;
    const columns = [
      {
        Header: 'Ticker',
        accessor: 'symbol',
        maxWidth: 150,
        Cell: cell => (
          <Equity
            equity={cell.original}
          />
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      }, {
        Header: 'Market cap',
        accessor: 'stats.marketCap',
        Cell: cell => (
          <FormattedCoinValue
            value={cell.value}
            large={true}
          />
        ),
        getProps: () => ({ align: 'end' }),
      },
      {
        Header: '%5d',
        accessor: 'stats.day5ChangePercent',
        maxWidth: 120,
        Cell: cell => (<ColoredPercentChange value={cell.value} />),
        getProps: () => ({ textAlign: 'end' }),
      },
      {
        Header: 'Exchange',
        accessor: 'exchange.name',
        Cell: cell => (cell.value && (
          <RoutedAnchor route='equities_by_exchange' params={{ exchange: cell.value }} >
            {cell.value}
          </RoutedAnchor>
        )
        ),
      },
      {
        Header: 'Industry',
        accessor: 'industry.name',
        Cell: cell => (cell.value && (
          <RoutedAnchor route='equities_by_industry' params={{ industry: cell.value }} >
            {cell.value}
          </RoutedAnchor>
        )
        ),
      },
      {
        Header: 'Sector',
        accessor: 'sector.name',
        Cell: cell => (cell.value && (
          <RoutedAnchor route='equities_by_sector' params={{ sector: cell.value }} >
            {cell.value}
          </RoutedAnchor>
        )
        ),
      },
    ];
    return (
      <PagingGraphqlList
        columns={columns}
        loadMoreEntries={loadMoreEntries}
        data={data}
        onExpand={this.onExpand}
        aliases={{ 'stats': 'tickers_keystats' }}
        gqlProps={{ exchange, industry, sector }}
        ordering={[{ id: 'stats.marketCap', desc: true }]}
      />
    );
  }
}

EquitiesList.defaultProps = {
  exchange: undefined,
  industry: undefined,
  sector: undefined,
};

EquitiesList.propTypes = {
  exchange: PropTypes.string,
  industry: PropTypes.string,
  sector: PropTypes.string,
};

export default withGraphQLList(allEquitiesQuery, EquitiesList);
