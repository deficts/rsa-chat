var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log("A user connected");

  socket.on('new-message', (message) => {
    io.emit('new-message',message);
  });
});

server.listen(3000,()=>{
  console.log("Socket.io server is listening on port 3000");
});
