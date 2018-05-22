import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box } from 'grommet';
import { Card, PagingTable } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import Equity from './Equity';
import { FormattedCoinValue } from '../utils/formatters';
import { equityStatsQuery } from '../../graphql/equities';


class StatsCard extends Component {
  renderStats = ({ stats }) => {
    if (!stats) {
      return null;
    }
    const data = [];
    data.push({
      label: '52 week range',
      value: (
        <Box direction='row' justify='end'>
          <FormattedCoinValue value={stats.week52low} />
          {' - '}
          <FormattedCoinValue value={stats.week52high} />
        </Box>
      ),
    });
    data.push({
      label: 'Market cap',
      value: (
        <FormattedCoinValue
          value={stats.marketCap}
          large={true}
        />),
    });
    data.push({
      label: 'Beta',
      value: stats.beta,
    });
    data.push({
      label: 'Latest EPS',
      value: (
        <FormattedCoinValue
          value={stats.latestEPS}
        />),
    });
    data.push({
      label: 'Latest EPS date',
      value: stats.latestEPSDate,
    });
    data.push({
      label: 'Dividend (yield)',
      value: `${stats.dividendRate} (${stats.dividendYield})`,
    });
    data.push({
      label: 'Ex-dividend date',
      value: stats.exDividendDate,
    });
    return (
      <PagingTable
        resizable={false}
        columns={[
          {
            accessor: 'label',
          },
          {
            accessor: 'value',
            Cell: cell => (<strong>{cell.value}</strong>),
            getProps: () => ({ textAlign: 'end' }),
          },
        ]}
        data={data}
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
          <Equity equity={equity} size='large' />
        </CardTitle>
        <CardSubTitle border='bottom'>
          Key stats
        </CardSubTitle>
        <CardContent >
          <Box full='horizontal' pad='small' >
            {this.renderStats(equity)}
          </Box>
        </CardContent>
      </Card>
    );
  }
}
StatsCard.defaultProps = {
  symbol: 'AAPL',
};

StatsCard.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  symbol: PropTypes.string,
};


export default graphql(equityStatsQuery, {
  options: props => (
    { variables: { symbol: props.symbol } }),
})(StatsCard);
