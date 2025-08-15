import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

let socket;

export const getSocket = (token) => {
  if (socket) return socket;
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    auth: { token }
  });
  return socket;
};

export const closeSocket = () => {
  if (socket) { socket.disconnect(); socket = null; }
};
