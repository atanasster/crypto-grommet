import React, { Component } from 'react';
import { Box, Markdown } from 'grommet';
import { shortDate } from 'grommet-controls/utils';
import connect from '../../redux';
import Coin from './Coin';
import ICOCard from './ICOCard';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import { allICOCoinsQuery } from '../../graphql/coins';


class ICOList extends Component {
  onExpand = ({ row }) => (
    <Box direction='row' pad='small' gap='medium'>
      <Box>
        {row.icoDescription && (
          <Markdown >
            {row.icoDescription}
          </Markdown>
        )}
      </Box>
      <ICOCard
        symbol={row.symbol}
      />
    </Box>
  );
  render() {
    const { data, loadMoreEntries } = this.props;
    const columns = [
      {
        title: 'Coin',
        name: 'name',
        formatter: ({ row }) => (
          <Coin
            coin={row}
            toCoin={{ symbol: this.props.defaultCurrency }}
            exchange={this.props.defaultExchange}
            level={4}
            border={null}
          />
        ),
      }, {
        title: 'Status',
        name: 'icoStatus',
      }, {
        title: 'Start date',
        name: 'icoDate',
        formatter: ({ value }) => (shortDate(value)),
      }, {
        title: 'End date',
        name: 'icoEndDate',
        formatter: ({ value }) => (value ? shortDate(value) : 'N/A'),
      }, {
        title: 'Token type',
        name: 'icoTokenType',
      }, {
        title: 'Funding target',
        name: 'icoFundingTarget',
        align: 'right',
      },
    ];
    return (
      <PagingGraphqlList
        columns={columns}
        loadMoreEntries={loadMoreEntries}
        data={data}
        onExpand={this.onExpand}
        ordering={[{ id: 'icoDate', desc: true }]}
        gqlProps={{ hasICO: true }}
      />
    );
  }
}

const mapStateToProps = state => ({
  defaultCurrency: state.settings.defaultCurrency,
  exchange: state.settings.aggregatedExchange,
  defaultExchange: state.settings.defaultExchange,
});

export default withGraphQLList(allICOCoinsQuery, connect(mapStateToProps)(ICOList));

