import React from 'react';
import { graphql } from 'react-apollo';
import { Box, WorldMap as GrommetWordMap, Image } from 'grommet';
import { PagingTable } from 'grommet-controls';
import RoutedAnchor from '../RoutedAnchor';
import SideLayer from '../SideLayer';
import { uniqueCountries, continents } from './countries';
import { ExchangeCountries } from './Exchange';
import { allExchangesQuery } from '../graphql/exchanges';

class WorldMap extends React.Component {
  state = {
    worldContinent: undefined,
    worldExchanges: undefined,
    continentExchanges: undefined,
    continent: undefined,
  };

  exchangesByName(name) {
    const { list } = this.props.data;
    const continent = continents.find(c => (c.name === name));
    if (list) {
      const allExchanges = list.results;
      const exchanges = Object.keys(allExchanges).map(key => allExchanges[key]);
      const continentExchanges = [];
      this.countries = uniqueCountries(allExchanges);

      this.countries.filter(c => (c.continent === continent.code))
        .forEach((c) => {
          exchanges.filter(e => e.countries.findIndex(
            ec => (ec.code === c.code)
          ) !== -1).forEach((e) => {
            if (continentExchanges.findIndex(ex => ex.symbol === e.symbol) === -1) {
              continentExchanges.push(e);
            }
          });
        });
      return { continentExchanges, continent };
    }
    return null;
  }

  onContinentClick = (name) => {
    const exchanges = this.exchangesByName(name);
    if (exchanges) {
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
    }
  };

  onContinentHover = (hover, name) => {
    if (hover) {
      const exchanges = this.exchangesByName(name);
      if (exchanges) {
        this.setState({
          worldContinent: name,
          worldExchanges: exchanges.continentExchanges.length,
        });
      }
    } else {
      this.setState({ worldContinent: undefined });
    }
  };

  render() {
    const {
      worldContinent, worldExchanges, continentExchanges, continent,
    } = this.state;
    let layer;
    if (continentExchanges) {
      layer = (
        <SideLayer
          onClose={() => this.setState({ continentExchanges: undefined })}
          heading={continent.name}
        >
          <Box basis='large' margin={{ top: 'small' }}>
            <PagingTable
              resizable={false}
              decorations={{
                rowOdd: { background: { color: 'light-1' } },
              }}
              defaultPageSize={50}
              data={continentExchanges}
              columns={[
                {
                  Cell: props => (
                    <RoutedAnchor path={`/exchanges/prices/${props.original.name}`}>
                      <Image src={props.original.image} />
                    </RoutedAnchor>),
                }, {
                  accessor: 'name',
                  Cell: props => (
                    <RoutedAnchor path={`/exchanges/prices/${props.original.name}`}>
                      {props.original.name}
                    </RoutedAnchor>),
                }, {
                  Cell: props => (
                    <Box direction='row'>
                      <ExchangeCountries countries={props.original.countries} />
                    </Box>),
                },
              ]}
            />
          </Box>
        </SideLayer>
      );
    }
    const continentHover = worldContinent ? (
      `${worldExchanges} exchanges in ${worldContinent}, click to see more...`
    ) : null;
    return (
      <Box full='horizontal'>
        <Box direction='row'>
          <GrommetWordMap
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
    );
  }
}


export default graphql(allExchangesQuery, {
  options: () => ({
    variables: {
      offset: 0,
      limit: 500,
    },
  }),
})(WorldMap);

