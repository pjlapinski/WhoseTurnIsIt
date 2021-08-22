const config = require('./config');
const http = require('http');
const { Server } = require('socket.io');

const keepAliveListener = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', config.REACT_HOST);
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Max-Age', 2592000);
  res.end('Alive');
};
const server = http.createServer(keepAliveListener);

const io = new Server(server, {
  cors: {
    origin: config.REACT_HOST,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  socket.on('guest-room-id', roomId => {
    if (io.sockets.adapter.rooms.get(roomId) === undefined) {
      socket.emit('room-doesnt-exist');
      return;
    }
    socket.join(roomId);
    const clients = io.sockets.adapter.rooms.get(roomId);
    socket.to(roomId).emit('request-initiative');
    io.in(roomId).emit('room-size', clients.size);

    socket.on('add-to-initiative', char => io.in(roomId).emit('add-to-initiative', char));
    socket.on('disconnecting', () => {
      socket.to(roomId).emit('room-size', clients.size - 1);
    });
  });
  socket.on('owner-room-id', roomId => {
    socket.join(roomId);

    socket.on('post-initiative', initiative => socket.to(roomId).emit('get-initiative', initiative));
    socket.on('advance-initiative', () => socket.to(roomId).emit('advance-initiative'));
  });
});

server.listen(config.PORT);
