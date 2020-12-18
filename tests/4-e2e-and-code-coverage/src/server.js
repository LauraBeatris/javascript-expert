const http = require('http');

const router = require('./router');

const PORT = 8080;

const server = http.createServer(router)
  .listen(PORT, () => console.log('Server listening on port', PORT));

module.exports = server;