import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import { FormattedCoinValue, ColoredPercentChange, PercentValue } from '../utils/formatters';
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
        title: '% 52 weeks',
        name: 'stats.week52change',
        maxWidth: 120,
        formatter: ({ value }) => (<ColoredPercentChange value={value} />),
        align: 'right',
        visibility: 'hidden',
      },
      {
        title: '% 1 year',
        name: 'stats.year1ChangePercent',
        maxWidth: 120,
        formatter: ({ value }) => (<ColoredPercentChange value={value} />),
        align: 'right',
        visibility: 'hidden',
      },
      {
        title: '% 2 year',
        name: 'stats.year2ChangePercent',
        maxWidth: 120,
        formatter: ({ value }) => (<ColoredPercentChange value={value} />),
        align: 'right',
        visibility: 'hidden',
      },
      {
        title: '% 5 year',
        name: 'stats.year5ChangePercent',
        maxWidth: 120,
        formatter: ({ value }) => (<ColoredPercentChange value={value} />),
        align: 'right',
        visibility: 'hidden',
      },
      {
        title: '% YTD',
        name: 'stats.ytdChangePercent',
        maxWidth: 120,
        formatter: ({ value }) => (<ColoredPercentChange value={value} />),
        align: 'right',
        visibility: 'hidden',
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
      {
        title: '52 w high',
        name: 'stats.week52high',
        formatter: ({ value }) => <FormattedCoinValue value={value} />,
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: '52 w low',
        name: 'stats.week52low',
        formatter: ({ value }) => <FormattedCoinValue value={value} />,
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'EPS TTM',
        name: 'stats.ttmEPS',
        formatter: ({ value }) => <FormattedCoinValue value={value} />,
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'EPS Surprise $',
        name: 'stats.EPSSurpriseDollar',
        formatter: ({ value }) => <FormattedCoinValue value={value} />,
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'EPS Surprise %',
        name: 'stats.EPSSurprisePercent',
        formatter: ({ value }) => (<ColoredPercentChange value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Consensus EPS',
        name: 'stats.consensusEPS',
        formatter: ({ value }) => `$${value}`,
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Beta',
        name: 'stats.beta',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'EBITDA',
        name: 'stats.EBITDA',
        formatter: ({ value }) => (
          <FormattedCoinValue
            value={value}
            large={true}
          />
        ),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Cash',
        name: 'stats.cash',
        formatter: ({ value }) => (
          <FormattedCoinValue
            value={value}
            large={true}
          />
        ),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: '20 day MA',
        name: 'stats.day200MovingAvg',
        formatter: ({ value }) => <FormattedCoinValue value={value} />,
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: '50 day MA',
        name: 'stats.day50MovingAvg',
        formatter: ({ value }) => <FormattedCoinValue value={value} />,
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Debt',
        name: 'stats.debt',
        formatter: ({ value }) => (
          <FormattedCoinValue
            value={value}
            large={true}
          />
        ),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Profit',
        name: 'stats.grossProfit',
        formatter: ({ value }) => (
          <FormattedCoinValue
            value={value}
            large={true}
          />
        ),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Revenue',
        name: 'stats.revenue',
        formatter: ({ value }) => (
          <FormattedCoinValue
            value={value}
            large={true}
          />
        ),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Revenue / share',
        name: 'stats.revenuePerShare',
        formatter: ({ value }) => (
          <FormattedCoinValue
            value={value}
          />
        ),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'ex Dividend %',
        name: 'stats.exDividendDate',
        visibility: 'hidden',
      },
      {
        title: 'Dividend',
        name: 'stats.dividendRate',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Dividend Yiled',
        name: 'stats.dividendYield',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Insider %',
        name: 'stats.insiderPercent',
        formatter: ({ value }) => (<ColoredPercentChange value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Institution %',
        name: 'stats.institutionPercent',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Short date',
        name: 'stats.shortDate',
        visibility: 'hidden',
      },
      {
        title: 'Short %',
        name: 'stats.shortInterest',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Float',
        name: 'stats.float',
        formatter: ({ value }) => (
          <FormattedCoinValue
            value={value}
            large={true}
          />
        ),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Shares outstanding',
        name: 'stats.sharesOutstanding',
        formatter: ({ value }) => (
          <FormattedCoinValue
            value={value}
            large={true}
            toSymbol='shares'
          />
        ),
        visibility: 'hidden',
        align: 'right',
      },

      {
        title: 'Latest EPS',
        name: 'stats.latestEPS',
        formatter: ({ value }) => <FormattedCoinValue value={value} />,
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Latest EPS date',
        name: 'stats.latestEPSDate',
        visibility: 'hidden',
      },
      {
        title: '1 Month chng %',
        name: 'stats.month1ChangePercent',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: '3 Months chng %',
        name: 'stats.month3ChangePercent',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: '6 Months chng %',
        name: 'stats.month6ChangePercent',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: '# Estimates',
        name: 'stats.numberOfEstimates',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'P/E High',
        name: 'stats.peRatioHigh',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'P/E Low',
        name: 'stats.peRatioLow',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Short ratio',
        name: 'stats.shortRatio',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Price/Book',
        name: 'stats.priceToBook',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Price/Sales',
        name: 'stats.priceToSales',
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Profit margin',
        name: 'stats.profitMargin',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Return on Assets',
        name: 'stats.returnOnAssets',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Return on Capital',
        name: 'stats.returnOnCapital',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
      },
      {
        title: 'Return on Equity',
        name: 'stats.returnOnEquity',
        formatter: ({ value }) => (<PercentValue value={value} />),
        visibility: 'hidden',
        align: 'right',
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
