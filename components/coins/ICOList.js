import React, { Component } from 'react';
import { Box, Markdown } from 'grommet';
import { shortDate } from 'grommet-controls/utils/moment';
import connect from '../../redux';
import Coin from './Coin';
import ICOCard from './ICOCard';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import { allICOCoinsQuery } from '../../graphql/coins';


class ICOList extends Component {
  onExpand = row => (
    <Box direction='row' pad='small' gap='medium'>
      <Box>
        {row.original.icoDescription && (
          <Markdown >
            {row.original.icoDescription}
          </Markdown>
        )}
      </Box>
      <ICOCard
        symbol={row.original.symbol}
      />
    </Box>
  );
  render() {
    const { data, loadMoreEntries } = this.props;
    const columns = [
      {
        Header: 'Coin',
        accessor: 'name',
        Cell: cell => (
          <Coin
            coin={cell.original}
            toCoin={{ symbol: this.props.defaultCurrency }}
            exchange={this.props.defaultExchange}
            level={4}
            border={null}
          />
        ),
      }, {
        Header: 'Status',
        accessor: 'icoStatus',
      }, {
        Header: 'Start date',
        accessor: 'icoDate',
        Cell: cell => (shortDate(cell.value)),
      }, {
        Header: 'End date',
        accessor: 'icoEndDate',
        Cell: cell => (cell.value ? shortDate(cell.value) : 'N/A'),
      }, {
        Header: 'Token type',
        accessor: 'icoTokenType',
      }, {
        Header: 'Funding target',
        getProps: () => ({ textAlign: 'end' }),
        accessor: 'icoFundingTarget',
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

