import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const searchQuery = gql`
  query searchEntities($offset: Int, $limit: Int, $search: String, $types: [String]) {
    search(offset: $offset, limit: $limit, search: $search, types: $types) {
      type
      results {
        slug
        image
        name
      }  
    }
  }
`;
