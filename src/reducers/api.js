import openSocket from 'socket.io-client';

function api(state) {
  if (!state) {
    const socket = openSocket('//localhost:8090');
    return {
      url: 'http://localhost:8568/api',
      socket,
    };
  }
  return state;
}

export default api;
