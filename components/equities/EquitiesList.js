import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import { FormattedCoinValue, ColoredPercentChange } from '../utils/formatters';
import RoutedAnchor from '../RoutedAnchor';
import EquityDashboard from './EquityDashboard';
import Equity from './Equity';
import { allEquitiesQuery } from '../../graphql/equities';

class EquitiesList extends Component {
  onExpand = ({ row }) => (
    <EquityDashboard symbol={row.symbol} />
  );
  render() {
    const {
      data, loadMoreEntries, exchange, industry, sector,
    } = this.props;
    const columns = [
      {
        title: 'Ticker',
        name: 'symbol',
        maxWidth: 200,
        formatter: ({ row }) => (
          <Equity
            equity={row}
          />
        ),
      },
      {
        title: 'Name',
        name: 'name',
      }, {
        title: 'Market cap',
        name: 'stats.marketCap',
        formatter: ({ value }) => (
          <FormattedCoinValue
            value={value}
            large={true}
          />
        ),
        align: 'right',
      },
      {
        title: '%5d',
        name: 'stats.day5ChangePercent',
        maxWidth: 120,
        formatter: ({ value }) => (<ColoredPercentChange value={value} />),
        align: 'right',
      },
      {
        title: 'Exchange',
        name: 'exchange.name',
        formatter: ({ value }) => (value ? (
          <RoutedAnchor route='equities_by_exchange' params={{ exchange: value }} >
            {value}
          </RoutedAnchor>
        ) : null
        ),
      },
      {
        title: 'Industry',
        name: 'industry.name',
        formatter: ({ value }) => (value ? (
          <RoutedAnchor route='equities_by_industry' params={{ industry: value }} >
            {value}
          </RoutedAnchor>
        ) : null
        ),
      },
      {
        title: 'Sector',
        name: 'sector.name',
        formatter: ({ value }) => (value ? (
          <RoutedAnchor route='equities_by_sector' params={{ sector: value }} >
            {value}
          </RoutedAnchor>
        ) : null
        ),
      },
    ];
    return (
      <PagingGraphqlList
        columns={columns}
        loadMoreEntries={loadMoreEntries}
        data={data}
        onExpand={this.onExpand}
        aliases={{ 'stats': 'tickers_keystats', 'symbol': 'slug' }}
        gqlProps={{ exchange, industry, sector }}
        sorting={[{ columnName: 'stats.marketCap', direction: 'desc' }]}
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
