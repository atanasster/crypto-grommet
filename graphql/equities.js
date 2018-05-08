import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const allEquitiesQuery = gql`
  query getEquities($offset: Int!, $limit: Int!, $ordering: String, $exchange: String, $industry: String, $sector: String) {
    list: allEquities(hasMarketCap: true, hasPriceChange: true, exchange: $exchange, industry: $industry, sector: $sector) {
      totalCount
      results(offset: $offset, limit: $limit, ordering: $ordering) {
        symbol: slug
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

export const equityInfoQuery = gql`
  query getEquity($symbol : String!) {
    equity(symbol: $symbol) {
      symbol: slug
      image
      name
    }
  }
`;

export const equityDetailsQuery = gql`
  query getEquity($symbol : String!) {
    equity(symbol: $symbol) {
      symbol: slug
      image
      name
      description
    }
  }
`;

export const equityPeersQuery = gql`
  query getEquity($symbol : String!) {
    equity(symbol: $symbol) {
      symbol: slug
      image
      name
      peers {
        peer {
          name
          symbol: slug
          image
        }
      }
    }
  }
`;

export const volumeByVenueQuery = gql`
  query getEquity($symbol : String!) {
    equityVolumeByExchange(symbol: $symbol) {
      date
      volume
      venue
      venueName
      marketPercent
      avgMarketPercent
    }
  }
`;

export const priceHistoryQuery = gql`
  query equity($symbol : String!, $offset: Int, $limit: Int) {
    prices: equity(symbol: $symbol) {
      list: dailyPrices(offset: $offset, limit: $limit) {
        totalCount 
        results {    
          date
          close
          high
          low
          open
          volume
          unadjustedVolume
          change
          changePercent
        }
      }    
    }
  }
`;
