import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Paragraph } from 'grommet';
import TextInput from '../grommet/TextInput/TextInput';
import { searchQuery } from '../graphql/entities';

const entityLinks = {
  'coin': { route: 'coin_info' },
  'equity': { route: 'equity_info' },
  'coinexchange': {
    route: 'exchange_info',
    routeParams: entity => ({ exchange: entity.name }),
  },
};
class SearchEntity extends React.Component {
  state = {
    data: { },
  };

  onSearch = async (e) => {
    const { client } = this.context;
    const { types } = this.props;
    const { data } = await client.query({
      query: searchQuery,
      variables: {
        types,
        search: e.target.value,
      },
    });
    this.setState({ data });
  };
  static contextTypes = {
    client: PropTypes.object.isRequired,
  };
  onSelect = ({ suggestion }) => {
    const { onChange } = this.props;
    const selected = suggestion.value.split('_');
    if (selected.length === 2) {
      const link = entityLinks[selected[0]];
      if (link !== undefined) {
        const { data: { search } } = this.state;
        const type = search.find(t => (t.type === selected[0]));
        if (type) {
          const entity = type.results.find(e => e.slug === selected[1]);
          if (entity) {
            if (onChange) {
              onChange({ link, entity, type: selected[0] });
            }
          }
        }
      }
    }
  };

  createSuggestions = () => {
    const { data: { search } } = this.state;
    const suggestions = [];
    if (search) {
      search.forEach((type) => {
        type.results.forEach((entity) => {
          suggestions.push({
            label: (
              <Box fill='horizontal'>
                <Text><strong>{entity.slug}</strong></Text>
                <Box direction='row' justify='between'>
                  <Paragraph size='small' margin='none'>
                    {entity.name}
                  </Paragraph>
                  <Text size='small'>
                    {type.type}
                  </Text>
                </Box>
              </Box>
            ),
            value: `${type.type}_${entity.slug}`,
          });
        });
      });
    }
    return suggestions;
  };

  render() {
    const { value } = this.props;
    return (
      <TextInput
        defaultValue={value}
        placeholder='search'
        suggestions={this.createSuggestions()}
        onChange={this.onSearch}
        onSelect={this.onSelect}
      />
    );
  }
}

SearchEntity.defaultProps = {
  onChange: undefined,
  value: undefined,
  types: ['equity', 'coin', 'coinexchange'],
};

SearchEntity.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
};

export default SearchEntity;

