import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const allEquitiesQuery = gql`
  query getEquities($offset: Int!, $limit: Int!, $ordering: String, $exchange: String, $industry: String, $sector: String) {
    list: allEquities(hasMarketCap: true, hasPriceChange: true, exchange: $exchange, industry: $industry, sector: $sector) {
      totalCount
      results(offset: $offset, limit: $limit, ordering: $ordering) {
        slug
        image
        name
        stats {
          marketCap
          day5ChangePercent
        }
        exchange {
          name
        }
        industry {
          name
        }
        sector {
          name
        }
      }  
    }
  }
`;
