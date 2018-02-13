import fetch from 'node-fetch';
import Turndown from 'turndown';
import { sleep } from '../api/utils';

const turndown = new Turndown();
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
  }).then(() => {
    coins.forEach((coin, idx) => {
      fetch(`https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${coin.id}`)
        .then(res => res.json())
        .then((data) => {
          if (data.Data) {
            const newValue = { ...coin, messages: [] };
            if (data.Data.General) {
              const general = data.Data.General;
              if (general.DangerTop) {
                newValue.messages.push({
                  message: turndown.turndown(data.Data.General.DangerTop),
                  type: 'error',
                });
              }
              if (general.WarningTop) {
                newValue.messages.push({
                  message: turndown.turndown(data.Data.General.WarningTop),
                  type: 'warning',
                });
              }
              if (general.InfoTop) {
                newValue.messages.push({
                  message: turndown.turndown(data.Data.General.InfoTop),
                  type: 'info',
                });
              }
              newValue.description = turndown.turndown(general.Description);
              newValue.twitter = general.Twitter;
            }
            coins[idx] = newValue;
          }
          // console.log(coins[idx]);
          return sleep();
        })
        .catch(() => (sleep()));
    });
  });

export default () => (coins);
