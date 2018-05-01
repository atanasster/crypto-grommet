import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Box } from 'grommet';
import { PagingTable } from 'grommet-controls';

class PagingGraphqlList extends Component {
  fetchData = ({ pageSize, page, sorted }) => {
    const { loadMoreEntries, aliases, gqlProps } = this.props;
    let ordering;
    if (sorted.length > 0) {
      const orderingFields = sorted[0].id.split('.');
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
      ordering = sorted[0].desc ? `-${orderField}` : orderField;
    }
    loadMoreEntries({
      offset: pageSize * page, limit: pageSize, ordering, gqlProps,
    });
  };

  render() {
    const {
      data: { list, loading }, columns, ordering, pageSize, onExpand,
    } = this.props;
    if (!list) {
      return null;
    }
    return (
      <Box fill='horizontal'>
        <PagingTable
          decorations={{
            table: { elevation: 'medium' },
            rowEven: { background: { color: 'light-1' } },
          }}
          manual={true}
          pages={Math.floor(list.totalCount / pageSize) + 1}
          loading={loading}
          onFetchData={this.fetchData}
          SubComponent={onExpand}
          defaultPageSize={pageSize}
          data={list.results}
          columns={columns}
          defaultSorted={ordering}
        />
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
  ordering: undefined,
  pageSize: 25,
  aliases: {},
  gqlProps: undefined,
  onExpand: undefined,
};

PagingGraphqlList.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
  ordering: PropTypes.array,
  pageSize: PropTypes.number,
  aliases: PropTypes.object,
  gqlProps: PropTypes.object,
  onExpand: PropTypes.func,
};

export default PagingGraphqlList;
