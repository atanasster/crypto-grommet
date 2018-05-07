import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
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
  onSearch = (e) => {
    this.props.data.refetch({ search: e.target.value });
  };

  onSelect = ({ suggestion }) => {
    const { onChange } = this.props;
    const selected = suggestion.value.split('_');
    if (selected.length === 2) {
      const link = entityLinks[selected[0]];
      if (link !== undefined) {
        const { data: { search } } = this.props;
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
};

SearchEntity.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default graphql(searchQuery,
  { options: () => ({ variables: { types: ['equity', 'coin', 'coinexchange'] } }) })(SearchEntity);

