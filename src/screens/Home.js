import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, WorldMap, Heading, Image, RoutedAnchor } from 'grommet';
import Table from '../components/table/Table';
import Page from '../components/Page';
import PriceGroup from '../components/PriceGroup';
import SideLayer from '../components/SideLayer';
import { renderCountries } from '../components/Exchange';

const continents = [
  {
    name: 'Africa',
    color: 'accent-1',
    code: 'AF',
  },
  {
    name: 'Australia',
    color: 'accent-2',
    code: 'OC',
  },
  {
    name: 'Asia',
    color: 'neutral-1',
    code: 'AS',
  },
  {
    name: 'Europe',
    color: 'neutral-2',
    code: 'EU',
  },
  {
    name: 'NorthAmerica',
    color: 'neutral-3',
    code: 'NA',
  },
  {
    name: 'SouthAmerica',
    color: 'status-warning',
    code: 'SA',
  },
];
class Home extends Component {
  state = { continentExchanges: undefined, continent: undefined };

  onContinentClick = (name) => {
    const { exchanges, countries } = this.props;
    const continent = continents.find(c => (c.name === name));
    const continentExchanges = [];
    countries.filter(c => (c.continent === continent.code))
      .forEach((c) => {
        exchanges.filter(e => e.countries.findIndex(ec => (ec === c.code)) !== -1).forEach((e) => {
          if (continentExchanges.findIndex(ex => ex.id === e.id) === -1) {
            continentExchanges.push(e);
          }
        });
      });
    continentExchanges.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (b.name > a.name) {
        return -1;
      }
      return 0;
    });
    this.setState({ continentExchanges, continent });
  };

  render() {
    const { continentExchanges, continent } = this.state;
    let layer;
    if (continentExchanges) {
      const exchanges = continentExchanges.map(exchange => (
        <tr key={`e_l_${exchange.id}`}>
          <td><RoutedAnchor path={`/exchanges/${exchange.id}`}><Image src={exchange.logo} /></RoutedAnchor></td>
          <td><RoutedAnchor path={`/exchanges/${exchange.id}`}>{exchange.name}</RoutedAnchor></td>
          <td><Box direction='row'>{renderCountries(exchange.countries)}</Box></td>
        </tr>
      ));
      layer = (
        <SideLayer onClose={() => this.setState({ continentExchanges: undefined })}>
          <Heading level={3}>
            <strong>{continent.name}</strong>
          </Heading>
          <Table>
            <tbody>
              {exchanges}
            </tbody>
          </Table>
        </SideLayer>
      );
    }
    return (
      <Page name='Crypto Grommet'>
        <Box border='bottom' align='center'>
          <WorldMap
            style={{ width: 'auto' }}
            continents={continents.map(c => (
              {
                ...c,
                onClick: this.onContinentClick,
              }))}
            selectColor='accent-2'
          />
          {layer}
        </Box>
        <Box border='bottom' full='horizontal'>
          <PriceGroup
            symbolPairs={[
            { symbol: 'BTC', toSymbol: 'USD', exchange: 'CCCAGG', unit: 'day' },
            { symbol: 'ETH', toSymbol: 'USD', exchange: 'CCCAGG', unit: 'day' },
            { symbol: 'LTC', toSymbol: 'USD', exchange: 'CCCAGG', unit: 'day' },
            { symbol: 'BCH', toSymbol: 'USD', exchange: 'CCCAGG', unit: 'day' },
            { symbol: 'XRP', toSymbol: 'USD', exchange: 'CCCAGG', unit: 'day' },
            ]}
          />
        </Box>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  exchanges: state.exchanges.all,
  countries: state.countries.all,
});

export default connect(mapStateToProps)(Home);
