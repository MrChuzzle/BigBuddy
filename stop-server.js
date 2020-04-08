const io = require('socket.io-client');
const socketClient = io.connect('https://localhost:8082'); // Specify port if your express server is not using default port 80

socketClient.on('connect', () => {
  socketClient.emit('npmStop');
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});