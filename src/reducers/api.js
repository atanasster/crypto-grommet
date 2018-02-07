import openSocket from 'socket.io-client';

const apiServer = process.env.NODE_ENV === "production" ? '' : 'http://localhost:8568';

function api(state) {
  if (!state) {
    const socket = openSocket('//localhost:8090');
    return {
      url: `${apiServer}/api`,
      socket,
    };
  }
  return state;
}

export default api;
