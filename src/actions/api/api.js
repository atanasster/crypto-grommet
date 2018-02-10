import openSocket from 'socket.io-client';

const server = process.env.NODE_ENV === 'production' ? '' : '//localhost:8568';
export const apiServer = `${server}/api`;
export const socketServer = openSocket(`${server}`);
