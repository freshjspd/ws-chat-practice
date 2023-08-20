const { Server } = require('socket.io');

function socketInit(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: 'http://localhost:3000' },
  });

  io.on('connection', socket => {
    console.log('socket is connected');
  });
}

module.exports = socketInit;
