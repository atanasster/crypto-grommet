import openSocket from 'socket.io-client';
import * as ActionTypes from './constants';

const socket = openSocket('https://streamer.cryptocompare.com/');

export const appendPricePair = (symbol, toSymbol, exchange, data) => ({
  type: ActionTypes.APPEND_PRICE_PAIR,
  exchange,
  symbol,
  toSymbol,
  data,
});

export const clearPricePair = ({ symbol, toSymbol, exchange }) => (
  { type: ActionTypes.CLEAR_PRICE_PAIR, symbol, toSymbol, exchange }
  );


const currentFields = {
  'TYPE': 0x0,       // hex for binary 0, it is a special case of fields that are always there
  'MARKET': 0x0,       // hex for binary 0, it is a special case of fields that are always there
  'FROMSYMBOL': 0x0,       // hex for binary 0, it is a special case of fields that are always there
  'TOSYMBOL': 0x0,       // hex for binary 0, it is a special case of fields that are always there
  'FLAGS': 0x0,       // hex for binary 0, it is a special case of fields that are always there
  'PRICE': 0x1,       // hex for binary 1
  'BID': 0x2,       // hex for binary 10
  'OFFER': 0x4,       // hex for binary 100
  'LASTUPDATE': 0x8,       // hex for binary 1000
  'AVG': 0x10,      // hex for binary 10000
  'LASTVOLUME': 0x20,      // hex for binary 100000
  'LASTVOLUMETO': 0x40,      // hex for binary 1000000
  'LASTTRADEID': 0x80,      // hex for binary 10000000
  'VOLUMEHOUR': 0x100,     // hex for binary 100000000
  'VOLUMEHOURTO': 0x200,     // hex for binary 1000000000
  'VOLUME24HOUR': 0x400,     // hex for binary 10000000000
  'VOLUME24HOURTO': 0x800,     // hex for binary 100000000000
  'OPENHOUR': 0x1000,    // hex for binary 1000000000000
  'HIGHHOUR': 0x2000,    // hex for binary 10000000000000
  'LOWHOUR': 0x4000,    // hex for binary 100000000000000
  'OPEN24HOUR': 0x8000,    // hex for binary 1000000000000000
  'HIGH24HOUR': 0x10000,   // hex for binary 10000000000000000
  'LOW24HOUR': 0x20000,   // hex for binary 100000000000000000
  'LASTMARKET': 0x40000,   // hex for binary 1000000000000000000, this is a special case and will only appear on CCCAGG messages
};

function currentUnpack(value) {
  const valuesArray = value.split('~');
  const valuesArrayLenght = valuesArray.length;
  const mask = valuesArray[valuesArrayLenght - 1];
  const maskInt = parseInt(mask, 16);
  const unpackedCurrent = {};
  let currentField = 0;
  Object.keys(currentFields).forEach((property) => {
    if (currentFields[property] === 0) {
      unpackedCurrent[property] = valuesArray[currentField];
      currentField += 1;
    // eslint-disable-next-line no-bitwise
    } else if (maskInt & currentFields[property]) {
      // i know this is a hack, for cccagg, future code please don't hate me:(, i did this to avoid
      // subscribing to trades as well in order to show the last market
      if (property === 'LASTMARKET') {
        unpackedCurrent[property] = valuesArray[currentField];
      } else {
        unpackedCurrent[property] = parseFloat(valuesArray[currentField]);
      }
      currentField += 1;
    }
  });
  return unpackedCurrent;
}

export function subscribeLastPrices({ symbol, toSymbol, exchange = 'CCCAGG' }) {
  return (dispatch) => {
    socket.on('m', (message) => {
      const messageType = message.substring(0, message.indexOf('~'));
      if (messageType === '5') {
        const data = currentUnpack(message);
        if (data.PRICE) {
          dispatch(appendPricePair(data.FROMSYMBOL, data.TOSYMBOL, data.MARKET, data));
        }
      }
    });
    socket.emit('SubAdd', { subs: [`5~${exchange}~${symbol}~${toSymbol}`] });
  };
}

export function unSubscribeLastPrices({ symbol, toSymbol, exchange = 'CCCAGG' }) {
  return () => {
    socket.emit('SubRemove', { subs: [`5~${exchange}~${symbol}~${toSymbol}`] });
  };
}
