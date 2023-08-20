const { Server } = require('socket.io');
const { Message } = require('./models');
const {
  SOCKET_EVENTS: { NEW_MESSAGE, NEW_MESSAGE_CREATED, NEW_MESSAGE_ERROR },
} = require('./constants');

function socketInit(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: 'http://localhost:3000' },
  });

  io.on('connection', socket => {
    console.log('socket is connected');

    const newMessageHandler = async payload => {
      try {
        // сохраняем пришедшее сообщение в базу
        const createdMessage = await Message.create(payload);
        // оповестить всех ,что есть новое сообщение
        io.emit(NEW_MESSAGE_CREATED, createdMessage.toObject());
      } catch (err) {
        // отправляем ошибку себе
        socket.emit(NEW_MESSAGE_ERROR, err);
      }
    };

    socket.on(NEW_MESSAGE, newMessageHandler);
  });
}

module.exports = socketInit;
