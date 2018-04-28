import gql from 'graphql-tag';

export const allExchangesQuery = gql`
  query getExchanges {
    allExchanges {
      symbol
      name
      image
      countries
      url
      hasOrderBook
    }
  }
`;


export const exchangeInfoQuery = gql`
  query getExchange($exchange : String!) {
    coinExchange(name: $exchange) {
      symbol
      name
      image
    }
  }
`;

export const exchangeMarketsQuery = gql`
  query getExchange($exchange : String!) {
    coinExchangeCurrency(name: $exchange) {
      symbol
      name
      currencies {
        symbol
        precision
        coin {
          symbol
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
      symbol
      name
      fundingFees {
        tierBased
        percentage
        withdraw {
          fee
          coin {
            symbol
            name
            image
          }
        }
        deposit {
          fee
          coin {
            symbol
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
  query getOrderBook($exchange : String!, $symbol: String!, $toSymbol: String!, $start: Int, $limit: Int) {
    coinOrderBook(name: $exchange, symbol: $symbol, toSymbol: $toSymbol, start: $start, limit: $limit) {
      symbol
      exchange {
        symbol
        name
        image
      }
      coin {
        symbol
        name
        image
      } 
      lastUpdated
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
