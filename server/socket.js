const { Server } = require('socket.io');
const { Message } = require('./models');

function socketInit(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: 'http://localhost:3000' },
  });

  io.on('connection', socket => {
    console.log('socket is connected');

    socket.on('NEW_MESSAGE', async payload => {
      console.log('payload :>> ', payload);
      try {
        // сохраняем пришедшее сообщение в базу
        const createdMessage = await Message.create(payload);
        // оповестить всех ,что есть новое сообщение
        io.emit('NEW_MESSAGE_CREATED', createdMessage.toObject());
      } catch (err) {
        // отправляем ошибку себе
        socket.emit('NEW_MESSAGE_ERROR', err);
      }
    });
  });
}

module.exports = socketInit;
