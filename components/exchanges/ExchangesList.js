import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Anchor } from 'grommet';
import { ConnectedExchange, ExchangeCountries } from './Exchange';
import PagingGraphqlList, { withGraphQLList } from '../PagingGraphqlList';
import { allExchangesQuery } from '../../graphql/exchanges';

const ExchangesList = ({ data, loadMoreEntries, country }) => {
  const columns = [
    {
      title: 'Exchange',
      name: 'name',
      formatter: ({ row }) => (
        <ConnectedExchange size='medium' exchange={row} />
      ),
    }, {
      title: 'Countries',
      name: 'countries',
      formatter: ({ value }) => (
        <Box direction='row'>
          <ExchangeCountries countries={value} />
        </Box>),
    }, {
      title: 'www',
      name: 'url',
      formatter: ({ value, row }) => (value ? value.map(href => (
        <Box key={`www_${href}`} pad={{ horizontal: 'small' }}>
          <Anchor
            a11yTitle={`Visit the exchange ${row.name} web site`}
            href={href}
            target='_blank'
          >
            <Text truncate={true}>{href}</Text>
          </Anchor>
        </Box>
      )) : null),
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

