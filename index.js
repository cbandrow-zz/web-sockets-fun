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

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  socket.on('typing', (msg)=>{
    io.emit('typing event', msg)
  })

  socket.on('nottyping', ()=>{
    io.emit('end typing')
  })
});

http.listen(3000, () =>{
  console.log('Listening on *:3000')
})
