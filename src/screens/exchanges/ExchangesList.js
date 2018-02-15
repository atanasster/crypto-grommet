import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Text, Anchor, Select } from 'grommet';
import Table from '../../components/table/Table';
import Page from '../../components/pages/Page';
import Exchange, { ExchangeCountries, Country } from '../../components/Exchange';

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
  renderExchanges() {
    const { exchanges, countries: allCountries } = this.props;
    const { searchCountries } = this.state;
    const countries = searchCountries || allCountries;
    const all = Object.keys(exchanges).map(key => exchanges[key]);
    return (
      <Table
        filterable={true}
        data={all}
        columns={[
          {
            Header: 'Exchange',
            accessor: 'name',
            Cell: cell => <Exchange exchange={cell.value} />,
          }, {
            Header: 'Countries',
            accessor: 'countries',
            filterMethod: (filter, row) =>
              (!filter.value || row.countries.indexOf(filter.value) !== -1),
            Filter: cell => (
              <Select
                tabindex='-1'
                a11yTitle='Open countries filter'
                onSearch={this.filterCountries}
                onClose={() => this.setState({ searchCountries: undefined })}
                dropSize='medium'
                activeOptionIndex={
                  cell.filter ? countries.indexOf(cell.filter) + 1 : undefined
                }
                background='white'
                options={[{ code: undefined }].concat(countries)}
                value={cell.filter ? <Country
                  {...countries.find(country => (country.code === cell.filter.value))}
                /> : undefined}
                onChange={({ option }) => {
                  cell.onChange(option.code);
                }}
              >
                {option => <Country key={`country_${option.code}`} {...option} />}
              </Select>
            ),
            Cell: cell => (
              <Box direction='row'>
                <ExchangeCountries countries={cell.value} />
              </Box>),
          }, {
            Header: 'www',
            filterable: false,
            accessor: 'url',
            Cell: (cell) => {
              const urls = typeof cell.value === 'string' ? [cell.value] : cell.value;
              return urls.map(href => (
                <Box key={`www_${href}`} pad={{ horizontal: 'small' }}>
                  <Anchor href={href} target='_blank'>
                    <Text truncate={true}>{href}</Text>
                  </Anchor>
                </Box>
              ));
            },
          },
        ]}
      />
    );
  }

  render() {
    return (
      <Page name='Exchanges'>
        {this.renderExchanges()}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  exchanges: state.exchanges.all,
  countries: state.countries.all,
});

export default connect(mapStateToProps)(ExchangesList);
