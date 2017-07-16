var app = require('express')();
const express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/public/index.html');
})

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('log in');

  socket.on('disconnect', function(){
    io.emit('log out');
  });

  socket.on('typing', (msg)=>{
    io.emit('typing event', msg);
  });

  socket.on('nottyping', ()=>{
    io.emit('end typing');
  });

  socket.on('user signon', (user) =>{
    io.emit('signon event', user);
  })
});

io.on('chat message', function(socket){
  socket.on('chat message', function(data){
    io.broadcast.emit('receive message', data);
  });
});

http.listen(3000, () =>{
  console.log('Listening on *:3000')
})
