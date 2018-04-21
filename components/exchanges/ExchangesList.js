import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Box, Text, Anchor, Select } from 'grommet';
import { PagingTable } from 'grommet-controls';
import { ConnectedExchange, ExchangeCountries, Country } from './Exchange';
import { uniqueCountries } from './countries';
import { allExchangesQuery } from '../graphql/exchanges';

class ExchangesList extends Component {
  state = { searchCountries: undefined };

  filterCountries = (query) => {
    const { countries } = this.props;
    this.setState({
      searchCountries: countries.filter(country =>
        country.name.toLowerCase()
          .match(query.toLowerCase())),
    });
  }
  render() {
    const { allExchanges, loading } = this.props.data;
    const { searchCountries } = this.state;
    const countries = searchCountries || uniqueCountries(allExchanges);
    const columns = [
      {
        Header: 'Exchange',
        accessor: 'name',
        Cell: cell => (
          <ConnectedExchange exchange={cell.original} />
        ),
        Footer: cell => (
          <Text >{`${cell.data.length} of ${allExchanges ? allExchanges.length : 0} exchanges`}</Text>
        ),
      }, {
        Header: 'Countries',
        accessor: 'countries',
        filterMethod: (filter, row) => !filter.value || row.countries.indexOf(filter.value) !== -1,
        Filter: ({ filter, onChange }) => (
          <Box>
            <Select
              a11yTitle='Open countries filter'
              onSearch={this.filterCountries}
              onClose={() => this.setState({ searchCountries: undefined })}
              dropSize='medium'
              activeOptionIndex={
                      filter ? countries.indexOf(filter) + 1 : undefined
                    }
              background='white'
              options={[{ code: undefined }].concat(countries)}
              value={filter ? <Country
                {...countries.find(country => (country.code === filter.value))}
              /> : undefined}
              onChange={({ option }) => {
                      onChange(option.code);
                    }}
            >
              {option => <Country key={`country_${option.code}`} {...option} />}
            </Select>
          </Box>),
        Cell: cell => (
          <Box direction='row'>
            <ExchangeCountries countries={cell.value} />
          </Box>),
      }, {
        Header: 'www',
        filterable: false,
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
      <Box fill='horizontal'>
        <PagingTable
          filterable={true}
          decorations={{
            table: { elevation: 'medium' },
            rowEven: { background: { color: 'light-1' } },
          }}
          data={allExchanges}
          loading={loading}
          columns={columns}
        />
      </Box>
    );
  }
}

export default graphql(allExchangesQuery)(ExchangesList);

