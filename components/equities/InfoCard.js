import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box, Paragraph, Anchor } from 'grommet';
import { Card, PagingTable } from 'grommet-controls';
import { CardTitle, CardSubTitle, CardContent } from 'grommet-controls/components/Card';
import Equity from './Equity';
import { FormattedCoinValue } from '../utils/formatters';
import { equityStatsQuery } from '../../graphql/equities';


class InfoCard extends Component {
  renderStats = ({
    stats, equityType, industry, sector, exchange, CEO, url,
  }) => {
    if (!stats) {
      return null;
    }
    const data = [];
    data.push({
      label: 'Type',
      value: equityType,
    });
    data.push({
      label: 'CEO',
      value: CEO,
    });
    data.push({
      label: 'Float',
      value: (
        <FormattedCoinValue
          value={stats.float}
          large={true}
        />),
    });
    data.push({
      label: 'Outstanding',
      value: (
        <FormattedCoinValue
          value={stats.sharesOutstanding}
          large={true}
        />),
    });

    data.push({
      label: 'Industry',
      value: industry.name,
    });
    data.push({
      label: 'Sector',
      value: sector.name,
    });
    data.push({
      label: 'Exchange',
      value: exchange.name,
    });
    data.push({
      label: 'Website',
      value: <Anchor href={url} target='_blank' label={url} />,
    });

    return (
      <PagingTable
        resizable={false}
        decorations={{
          rowOdd: { background: { color: 'light-1' } },
        }}
        columns={[
          {
            maxWidth: 105,
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
          Company overview
        </CardSubTitle>
        <CardContent >
          <Box full='horizontal' pad='small' >
            <Paragraph>
              {equity.description}
            </Paragraph>
            {this.renderStats(equity)}
          </Box>
        </CardContent>
      </Card>
    );
  }
}
InfoCard.defaultProps = {
  symbol: 'AAPL',
};

InfoCard.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  symbol: PropTypes.string,
};


export default graphql(equityStatsQuery, {
  options: props => (
    { variables: { symbol: props.symbol } }),
})(InfoCard);
