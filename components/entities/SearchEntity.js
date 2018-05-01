import React from 'react';
import { graphql } from 'react-apollo';
import { Box, Text, Paragraph } from 'grommet';
import TextInput from '../grommet/TextInput/TextInput';
import { searchQuery } from '../graphql/entities';
import routerPush from '../Router';

const entityLinks = {
  'coin': 'coin_info',
};
class SearchEntity extends React.Component {
  onSearch = (e) => {
    this.props.data.refetch({ search: e.target.value });
  };

  onSelect = ({ suggestion }) => {
    const selected = suggestion.value.split('_');
    if (selected.length === 2) {
      const route = entityLinks[selected[0]];
      if (route !== undefined) {
        routerPush({ route, params: { symbol: selected[1] } });
      }
    }
  };

  createSuggestions = () => {
    const { data: { search } } = this.props;
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
    return (
      <TextInput
        placeholder='search'
        suggestions={this.createSuggestions()}
        onInput={this.onSearch}
        onSelect={this.onSelect}
      />
    );
  }
}

export default graphql(searchQuery,
  { options: () => ({ skip: true }) })(SearchEntity);

