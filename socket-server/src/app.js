var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

const publicNarray= [];

io.on('connection', function(socket) {
  console.log("A user connected");
  console.log(socket.id);
  io.emit('send-id',socket.id);

  socket.on('new-message', (nickname,message,id) => {
    console.log(id);
    io.emit('new-message',{nickname,message,id});
  });

  socket.on('new-user', (publicN)=>{
    publicNarray.push(publicN);
    io.emit('public-N',publicNarray);
  })
});

server.listen(3000,()=>{
  console.log("Socket.io server is listening on port 3000");
});

