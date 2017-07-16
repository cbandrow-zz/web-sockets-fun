var socket = io();

$(function () {
    var socket = io();

    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    let eventCounter = 0;
    $('#m').on('keypress', ()=>{
      eventCounter ++;
      if (eventCounter === 1){
        socket.emit('typing', `user is typing a message...`)
      } else {
        setTimeout(() =>{
          socket.emit('nottyping')
          eventCounter = 0;
        }, 1500)
      }
    })

    // $('#m').on('keyup', ()=>{
    // })

    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });

    socket.on('log in', (msg) =>{
      $('#messages').append($('<li>').text('New User has logged in'));
    })

    socket.on('log out', (msg) =>{
      $('#messages').append($('<li>').text('User has logged out'));
    })

    socket.on('typing event', (msg) =>{
      $('#typing-event').append($('<p>').text(msg))
    })

    socket.on('end typing', (msg) =>{
      $('#typing-event').empty()
    })
  });
