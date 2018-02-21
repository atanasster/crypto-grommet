import orderBook from './order_book';

const socketIO = require('socket.io');

export default ({ app, config }) => {
  const io = socketIO(app);
  io.on('connection', (socket) => {
    socket.on('order_book', ({ symbol, toSymbol }) => orderBook({
      socket, symbol, toSymbol, config,
    }));
  });
};
