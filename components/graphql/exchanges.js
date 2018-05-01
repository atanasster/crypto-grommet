import gql from 'graphql-tag';

export const allExchangesQuery = gql`
  query getExchanges($offset: Int, $limit: Int, $ordering: String, $country: String) {
    list: allExchanges(country: $country) {
    totalCount
    results(offset: $offset, limit: $limit, ordering: $ordering) {
        symbol: slug
        name
        image
        countries {
          code
        }
        url
        hasOrderBook
      }  
    }
  }
`;


export const exchangeInfoQuery = gql`
  query getExchange($exchange : String!) {
    coinExchange(name: $exchange) {
      symbol: slug
      name
      image
    }
  }
`;

export const exchangeMarketsQuery = gql`
  query getExchange($exchange : String!) {
    coinExchangeCurrency(name: $exchange) {
      symbol: slug
      name
      currencies {
        symbol
        precision
        coin {
          symbol: slug
          image
          name
        }
      }
      markets {
        base
        quote
        maker
        taker
      }
    }
  }
`;

export const exchangeFeesQuery = gql`
  query getExchange($exchange : String!) {
    coinExchangeFees(name: $exchange) {
      symbol: slug
      name
      fundingFees {
        tierBased
        percentage
        withdraw {
          fee
          coin {
            symbol: slug
            name
            image
          }
        }
        deposit {
          fee
          coin {
            symbol: slug
            name
            image
          }
        }
      }
      tradingFees {
        tierBased
        percentage
        taker {
          tier
          fee
        }
        maker {
          tier
          fee
        }
      }
    }
  }
`;

export const orderBookQuery = gql`
  query getOrderBook($exchange : String!, $symbol: String!, $toSymbol: String!, $offset: Int, $limit: Int) {
    coinOrderBook(name: $exchange, symbol: $symbol, toSymbol: $toSymbol, offset: $offset, limit: $limit) {
      symbol
      exchange {
        symbol: slug
        name
        image
      }
      coin {
        symbol: slug
        name
        image
      } 
      lastUpdated
      realToSymbol
      asks {
        price
        qty
      }
      bids {
        price
        qty
      }
    }
  }
`;
