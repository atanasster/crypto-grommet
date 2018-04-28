import gql from 'graphql-tag';

export const coinInfoQuery = gql`
  query getCoin($symbol : String!) {
    coin(symbol: $symbol) {
      symbol
      image
      name
    }
  }
`;

const ICOFields = `
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
`;

export const coinDetailsQuery = gql`
  query getCoin($symbol : String!) {
    coin(symbol: $symbol) {
      symbol
      image
      name
      description
      dangerMessage
      warningMessage
      infoMessage
      ${ICOFields}
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


export const allCoinsQuery = gql`
  query getCoins {
    allCoins {
      symbol
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

export const allICOQuery = gql`
  query getICOCoins {
    allIcos {
      symbol
      image
      name
      algorithm
      proofType
      fullyPremined
      preMinedValue
      totalCoinsSupply
      totalCoinsFreeFloat
      ${ICOFields}
    }
  }
`;

export const marketCapQuery = gql`
   query getMarketCap($currency : String!, $start: Int, $limit: Int) {
    marketCap(currency: $currency, start: $start, limit: $limit) {
      rank
      symbol
      lastUpdated
      priceUsd
      volume24hUsd
      marketCapUsd
      priceBtc
      availableSupply
      totalSupply
      price
      marketCap
      volume24h
      percentChange1h
      percentChange24h
      percentChange7d
      coin {
        symbol
        image
        name
      }
    }
  }
`;
