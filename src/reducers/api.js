import openSocket from 'socket.io-client';

const apiServer = process.env.NODE_ENV === "production" ? '' : '//localhost:8568';
const socketServer = process.env.NODE_ENV === "production" ? '' : '//localhost:8090';

function api(state) {
  if (!state) {
    const socket = socketServer;
    return {
      url: `${apiServer}/api`,
      socket,
    };
  }
  return state;
}

export default api;
