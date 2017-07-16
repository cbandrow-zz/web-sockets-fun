var socket = io();

$(function () {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    $('#m').on('keyup', ()=>{
      socket.emit('typing')
    })

    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });

    socket.on('log in', (msg) =>{
      $('#messages').append($('<li>').text('New User has logged in'));
    })

    socket.on('log out', (msg) =>{
      $('#messages').append($('<li>').text('User has logged out'));
    })
  });
