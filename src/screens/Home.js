import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, WorldMap, Heading, Image, RoutedAnchor } from 'grommet';
import Table from '../components/table/Table';
import Page from '../components/Page';
import PriceCard from '../components/PriceCard';
import SideLayer from '../components/SideLayer';
import CardScroll from '../components/CardScroll';
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
  state = {
    continentExchanges: undefined,
    continent: undefined,
    worldContinent: undefined,
    worldExchanges: undefined,
  };

  exchangesByName(name) {
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
    return { continentExchanges, continent };
  }

  onContinentClick = (name) => {
    const exchanges = this.exchangesByName(name);
    exchanges.continentExchanges.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (b.name > a.name) {
        return -1;
      }
      return 0;
    });
    this.setState(exchanges);
  };

  onContinentHover = (hover, name) => {
    if (hover) {
      const exchanges = this.exchangesByName(name);
      this.setState({ worldContinent: name, worldExchanges: exchanges.continentExchanges.length });
    } else {
      this.setState({ worldContinent: undefined });
    }
  };

  static renderPriceCards() {
    const homeCards = ['BTC', 'ETH', 'LTC', 'BCH', 'ETC', 'XRP'];
    const cards = homeCards.map((symbol, index) => {
      const colors = [
        'brand', 'accent-1', 'accent-2', 'neutral-1', 'neutral-2', 'neutral-3', 'status-ok', 'status-warning',
      ];
      const colorIdx = index % colors.length;
      return (
        <PriceCard
          key={`history_${index}`}
          color={colors[colorIdx]}
          symbol={symbol}
        />
      );
    });
    return (
      <Box margin={{ bottom: 'xsmall' }} pad='xsmall' align='center'>
        <CardScroll>
          {cards}
        </CardScroll>
      </Box>
    );
  }

  render() {
    const { continentExchanges, continent, worldContinent, worldExchanges } = this.state;
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
    const continentHover = worldContinent ? (
      `${worldExchanges} exchanges in ${worldContinent}, click to see more...`
    ) : null;
    return (
      <Page name='Crypto Grommet'>
        <Box align='center' border='bottom'>
          <Box>
            <Box direction='row'>
              <WorldMap
                style={{ width: 'auto' }}
                continents={continents.map(c => (
                  {
                    ...c,
                    onClick: this.onContinentClick,
                    onHover: hover => this.onContinentHover(hover, c.name),
                  }))}
                selectColor='accent-2'
              />

            </Box>
            <Box align='end' basis='xsmall'>
              {continentHover}
            </Box>
            {layer}
          </Box>
        </Box>
        <Box pad='small'>
          {Home.renderPriceCards()}
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
