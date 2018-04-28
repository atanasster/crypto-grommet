import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Box, Text, Markdown } from 'grommet';
import { PagingTable } from 'grommet-controls';
import { shortDate } from 'grommet-controls/utils/moment';
import connect from '../../redux';
import Coin from './Coin';
import ICOCard from './ICOCard';
import { allICOQuery } from '../graphql/coins';


class ICOList extends Component {
  // eslint-disable-next-line no-undef
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
        coin={row.original}
      />
    </Box>
  );
  render() {
    const {
      data: { allIcos, loading },
    } = this.props;
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
        Footer: cell => (<Text>{`${cell.data.length} of ${allIcos ? allIcos.length : '0'} ICOs`}</Text>
        ),
      }, {
        Header: 'Status',
        accessor: 'icoStatus',
      }, {
        Header: 'Start date',
        accessor: 'icoDate',
        id: 'start_date',
        Cell: cell => (shortDate(cell.value)),
      }, {
        Header: 'End date',
        accessor: 'icoEndDate',
        id: 'end_date',
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
      <Box fill='horizontal'>
        <PagingTable
          decorations={{
            table: { elevation: 'medium' },
            rowEven: { background: { color: 'light-1' } },
          }}
          loading={loading}
          filterable={true}
          data={allIcos}
          SubComponent={this.onExpand}
          columns={columns}
          defaultSorted={[{ id: 'start_date', desc: true }]}
        />
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  defaultCurrency: state.settings.defaultCurrency,
  exchange: state.settings.aggregatedExchange,
  defaultExchange: state.settings.defaultExchange,
});


export default graphql(allICOQuery)(connect(mapStateToProps)(ICOList));
