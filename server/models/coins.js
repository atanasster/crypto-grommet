import fetch from 'node-fetch';


let coins = [];

fetch('https://min-api.cryptocompare.com/data/all/coinlist')
  .then(res => res.json())
  .then((json) => {
    coins = Object.keys(json.Data).map((key) => {
      const coin = json.Data[key];
      return {
        algorithm: coin.Algorithm,
        coinName: coin.CoinName,
        fullName: coin.FullName,
        fullyPremined: coin.FullyPremined,
        id: coin.Id,
        imageUrl: `//www.cryptocompare.com${coin.ImageUrl}`,
        name: coin.Name,
        preMinedValue: coin.PreMinedValue,
        proofType: coin.ProofType,
        sortOrder: coin.SortOrder,
        sponsored: coin.Sponsored,
        symbol: coin.Symbol,
        totalCoinSupply: coin.TotalCoinSupply,
        totalCoinsFreeFloat: coin.TotalCoinsFreeFloat,
        url: `//www.cryptocompare.com${coin.Url}`,
      };
    });
  });

export default () => (coins);
