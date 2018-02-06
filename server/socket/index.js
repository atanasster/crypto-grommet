import Server from 'socket.io';
import orderBook from './order_book';

export default ({ config, db }) => {
  const io = new Server().attach(8090);
  io.on('connection', (socket) => {
    socket.on('order_book', ({ symbol, toSymbol }) => orderBook({
      socket, symbol, toSymbol, config, db,
    }));
  });
};
