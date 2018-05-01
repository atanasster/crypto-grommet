import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Anchor } from 'grommet';
import { ConnectedExchange, ExchangeCountries } from './Exchange';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import { allExchangesQuery } from '../graphql/exchanges';

const ExchangesList = ({ data, loadMoreEntries, country }) => {
  const columns = [
    {
      Header: 'Exchange',
      accessor: 'name',
      Cell: cell => (
        <ConnectedExchange exchange={cell.original} />
      ),
    }, {
      Header: 'Countries',
      accessor: 'countries',
      Cell: cell => (
        <Box direction='row'>
          <ExchangeCountries countries={cell.value} />
        </Box>),
    }, {
      Header: 'www',
      accessor: 'url',
      Cell: cell => cell.value && cell.value.map(href => (
        <Box key={`www_${href}`} pad={{ horizontal: 'small' }}>
          <Anchor
            a11yTitle={`Visit the exchange ${cell.original.name} web site`}
            href={href}
            target='_blank'
          >
            <Text truncate={true}>{href}</Text>
          </Anchor>
        </Box>
      )),
    },
  ];
  return (
    <PagingGraphqlList
      columns={columns}
      loadMoreEntries={loadMoreEntries}
      data={data}
      ordering={[{ id: 'name' }]}
      gqlProps={{ country }}
    />
  );
};

PropTypes.defaultProps = {
  country: undefined,
};

PropTypes.propTypes = {
  country: PropTypes.string,
};

export default withGraphQLList(allExchangesQuery, ExchangesList);

