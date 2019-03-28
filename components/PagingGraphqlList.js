import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box } from 'grommet';
import { Spinning } from 'grommet-controls';
import {
  PagingState,
  SortingState,
  CustomPaging,
  DataTypeProvider,
  RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser,
  DragDropProvider,
  Grid,
  PagingPanel,
  Table,
  TableColumnReordering,
  TableColumnVisibility,
  TableHeaderRow,
  TableRowDetail,
  Toolbar,
} from 'dx-react-grid-grommet';

class PagingGraphqlList extends Component {
  constructor(props) {
    super(props);
    const getCellValue = (row, columnName) => {
      if (columnName) {
        const columns = columnName.split('.');
        let result = row;
        for (let i = 0; i < columns.length; i += 1) {
          if (!result) {
            return undefined;
          }
          result = result[columns[i]];
        }
        return result;
      }
      return row[columnName];
    };

    this.state = {
      pageSizes: [5, 15, 25],
      currentPage: 0,
      columnExtensions: props.columns.map(column => (
        { columnName: column.name, wordWrapEnabled: true, align: column.align }
      )),
      columnOrder: props.columns.map(column => column.name),
      hiddenColumnNames: props.columns.filter(column => column.visibility === 'hidden').map(column => column.name),
      pageSize: props.pageSize,
      sorting: props.sorting,
      columns: props.columns.map(column => (
        { name: column.name, title: column.title, getCellValue }
      )),
    };
    this.formatters = props.columns.filter(column => column.formatter).map(column => (
      <DataTypeProvider
        key={`data_provider_${column.name}`}
        for={column.name}
        formatterComponent={column.formatter}
      />
    ));
  }

  componentDidMount() {
    this.fetchData();
  }

  changeColumnOrder = (newOrder) => {
    this.setState({ columnOrder: newOrder });
  };

  hiddenColumnNamesChange = (hiddenColumnNames) => {
    this.setState({ hiddenColumnNames });
  };
  changeCurrentPage = (currentPage) => {
    this.setState({
      currentPage,
    });
    this.fetchData();
  };

  changeSorting = (sorting) => {
    this.setState({
      sorting,
    });
    this.fetchData();
  };

  changePageSize = (pageSize) => {
    const { totalCount, currentPage: stateCurrentPage } = this.state;
    const totalPages = Math.ceil(totalCount / pageSize);
    const currentPage = Math.min(stateCurrentPage, totalPages - 1);

    this.setState({
      pageSize,
      currentPage,
    });
    this.fetchData();
  };

  fetchData = () => {
    const { pageSize, currentPage, sorting } = this.state;
    const {
      loadMoreEntries, aliases, gqlProps,
    } = this.props;
    let ordering;
    if (sorting.length > 0) {
      const orderingFields = sorting[0].columnName.split('.');
      let aliased = false;
      for (let i = 0; i < orderingFields.length; i += 1) {
        if (aliases[orderingFields[i]] !== undefined) {
          orderingFields[i] = aliases[orderingFields[i]];
          aliased = true;
        }
      }
      let orderField;
      if (aliased) {
        orderField = orderingFields.join('.');
      } else {
        [orderField] = orderingFields;
      }
      ordering = sorting[0].direction === 'desc' ? `-${orderField}` : orderField;
    }
    loadMoreEntries({
      offset: pageSize * (currentPage || 0), limit: pageSize, ordering, gqlProps,
    });
  };

  render() {
    const {
      data: { list, loading }, onExpand,
    } = this.props;
    const {
      columns, pageSizes, currentPage, columnExtensions, sorting, pageSize,
      columnOrder, hiddenColumnNames,
    } = this.state;
    if (!list) {
      return null;
    }
    return (
      <Box fill='horizontal' align='center'>
        <Grid
          rows={list.results}
          columns={columns}
        >
          {this.formatters}
          <DragDropProvider />
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />
          <CustomPaging
            totalCount={list.totalCount}
          />
          {onExpand && (
            <RowDetailState />
          )}
          <Table
            columnExtensions={columnExtensions}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={this.changeColumnOrder}
          />
          <TableHeaderRow showSortingControls={true} />
          <TableColumnVisibility
            hiddenColumnNames={hiddenColumnNames}
            onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
          />
          <Toolbar />
          <ColumnChooser />
          {onExpand && (
            <TableRowDetail
              contentComponent={onExpand}
            />
          )}
          <PagingPanel
            pageSizes={pageSizes}
          />
        </Grid>
        {loading && <Spinning />}
      </Box>
    );
  }
}


export const withGraphQLList = (gqlQuery, WrappedComponent) => (
  graphql(gqlQuery, {
    options: () => ({
      skip: true,
      variables: {
        offset: 0,
        limit: 0,
        ordering: undefined,
      },
    }),
    props({ data }) {
      return {
        data,
        loadMoreEntries({
          offset, limit, ordering, gqlProps,
        }) {
          return data.fetchMore({
            variables: {
              ...gqlProps,
              offset,
              limit,
              ordering,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }
              return Object.assign({}, previousResult, {
                list: fetchMoreResult.list,
              });
            },
          });
        },
      };
    },
  })(WrappedComponent)
);

PagingGraphqlList.defaultProps = {
  sorting: [],
  pageSize: 25,
  aliases: {},
  gqlProps: undefined,
  onExpand: undefined,
};

PagingGraphqlList.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    formatter: PropTypes.func,
    align: PropTypes.string,
    width: PropTypes.number,
  })).isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
  sorting: PropTypes.array,
  pageSize: PropTypes.number,
  aliases: PropTypes.object,
  gqlProps: PropTypes.object,
  onExpand: PropTypes.func,
};

export default PagingGraphqlList;

