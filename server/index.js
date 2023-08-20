const http = require('http');
const sockerInit = require('./socket');

const app = require('./app');

const PORT = process.env.PORT ?? 5000;

const httpServer = http.createServer(app);

sockerInit(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running!`);
});
