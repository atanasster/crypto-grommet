import gql from 'graphql-tag';

export const coinInfoQuery = gql`
  query getCoin($symbol : String!) {
    coin(symbol: $symbol) {
      symbol: slug
      image
      name
    }
  }
`;

export const icoDetailsQuery = gql`
  query getCoin($symbol : String!) {
    coin(symbol: $symbol) {
      symbol: slug
      image
      name
      icoDate
      icoEndDate
      icoDescription
      icoStatus
      icoBlogURL
      icoWebsiteURL
      icoWhitePaperURL
      icoFeatures
      icoTokenType
      icoFundingTarget
      icoStartPrice
      icoStartPriceCurrency
      icoFundsRaisedList
      icoTokenPercentageForInvestors
      icoTokenReserveSplit
      icoTokenSupply
      icoTokenSupplyPostICO
      icoFundingCap
      icoFundsRaisedUSD
      icoJurisdiction
      icoLegalAdvisers
      icoLegalForm
      icoPaymentMethod
    }
  }    
`;

export const coinDetailsQuery = gql`
  query getCoin($symbol : String!) {
    coin(symbol: $symbol) {
      symbol: slug
      image
      name
      description
      dangerMessage
      warningMessage
      infoMessage
    }
  }
`;

export const priceHistoryQuery = gql`
  query getPriceHistory($symbol : String!, $toSymbol : String!, $exchange: String!, $period: String, $limit: Int) {
    coinPriceHistory(symbol: $symbol, toSymbol: $toSymbol, exchange: $exchange, period: $period, limit: $limit) {
      time
      close
      high
      low
      open
      volumefrom
      volumeto
    }
  }
`;


export const allICOQuery = gql`
  query getICOCoins {
    allIcos {
      symbol: slug
      image
      name
      algorithm
      proofType
      fullyPremined
      preMinedValue
      totalCoinsSupply
      totalCoinsFreeFloat
    }
  }
`;

export const allICOCoinsQuery = gql`
   query getMarketCap($offset: Int!, $limit: Int!, $ordering: String, $hasMarketCap: Boolean, $hasICO: Boolean, $hasPriceChange: Boolean) {
    list: allCoins(hasMarketCap: $hasMarketCap, hasIco: $hasICO, hasPriceChange: $hasPriceChange) {
      totalCount
      results(offset: $offset, limit: $limit, ordering: $ordering) {
        symbol: slug
        image
        name
        icoStatus
        icoDate
        icoEndDate
        icoTokenType
        icoFundingTarget
        icoDescription
      }
    }  
  }
`;
export const allCoinsQuery = gql`
   query getAllCoins($offset: Int!, $limit: Int!, $ordering: String, $hasMarketCap: Boolean, $hasICO: Boolean, $hasPriceChange: Boolean, $algorithm: String, $proofType: String) {
    list: allCoins(hasMarketCap: $hasMarketCap, hasIco: $hasICO, hasPriceChange: $hasPriceChange, algorithm: $algorithm, proofType: $proofType) {
      totalCount
      results(offset: $offset, limit: $limit, ordering: $ordering) {
        stats {
          price
          marketCap
          priceBtc
          availableSupply
          totalSupply
          percentChange7d
        }  
        symbol: slug
        image
        name
        algorithm {
          name
        }  
        proofType {
          name
        }
        fullyPremined
        preMinedValue
      }
    }  
  }
`;
