import SocketSub from '../socket_sub/SocketSub';

class IEXStream extends SocketSub {
  unpack = message => JSON.parse(message);
  subKey = data => data.symbol;
}

const socketSub = new IEXStream('https://ws-api.iextrading.com/1.0/tops');

export function subscribeLastPrices(sub) {
  const { symbol, callback } = sub;
  socketSub.subscribe(
    {
      name: 'subscribe',
      payload: symbol,
      data: sub,
    },
    'message', callback
  );
}

export function unSubscribeLastPrices(sub) {
  const { symbol, callback } = sub;
  socketSub.unSubscribe('unsubscribe', symbol, callback);
}
