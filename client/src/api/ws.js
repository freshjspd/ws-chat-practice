import { io } from 'socket.io-client';
import {
  createMessageError,
  createMessageFullfilled,
} from '../store/slices/messagesSlice';

const socket = io('ws://localhost:5000'); // => 'connection' on server

export const createMessageWs = payload => socket.emit('NEW_MESSAGE', payload);

export function bringStoreToWs(store) {
  socket.on('NEW_MESSAGE_CREATED', payload => {
    store.dispatch(createMessageFullfilled(payload));
  });

  socket.on('NEW_MESSAGE_ERROR', payload => {
    store.dispatch(createMessageError(payload));
  });
}

export default socket;

// 'NEW_MESSAGE' => server:
// save to db
// server.emit('NEW_MESSAGE_CREATED')
