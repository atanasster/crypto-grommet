import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box } from 'grommet';
import { Card, PagingTable } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import Equity from './Equity';
import { FormattedCoinValue, PercentValuePrecalc } from '../utils/formatters';
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
        <Box direction='row' justify='end' gap='xsmall'>
          <FormattedCoinValue value={stats.week52low} />
          -
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
      value: (
        <Box direction='row' justify='end' gap='xsmall'>
          <FormattedCoinValue value={stats.dividendRate} />
          <Box direction='row'>
            (<PercentValuePrecalc value={stats.dividendYield} />)
          </Box>
        </Box>
      ),
    });
    data.push({
      label: 'Ex-dividend date',
      value: stats.exDividendDate,
    });
    data.push({
      label: 'PE ratio',
      value: (
        <Box direction='row' justify='end' gap='xsmall'>
          <FormattedCoinValue value={stats.peRatioLow} />
          -
          <FormattedCoinValue value={stats.peRatioHigh} />
        </Box>
      ),
    });
    data.push({
      label: 'Price / book',
      value: <FormattedCoinValue value={stats.priceToBook} />,
    });
    data.push({
      label: 'Price / sales',
      value: <FormattedCoinValue value={stats.priceToSales} />,
    });
    data.push({
      label: 'Insiders %',
      value: <PercentValuePrecalc value={stats.insiderPercent} />,
    });
    data.push({
      label: 'Institutions %',
      value: <PercentValuePrecalc value={stats.institutionPercent} />,
    });
    data.push({
      label: 'Short ratio',
      value: (
        <Box direction='row' justify='end' gap='xsmall'>
          <PercentValuePrecalc value={stats.shortRatio} />
          {stats.shortDate}
        </Box>
      ),
    });
    return (
      <PagingTable
        decorations={{
          rowOdd: { background: { color: 'light-1' } },
        }}
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
