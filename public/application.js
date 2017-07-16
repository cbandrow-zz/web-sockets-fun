var socket = io();

$(function () {
    let nicknameForm = $('#user-nickname')
    let nicknameSubmit = $('#user-nickname-submit')

    var socket = io();

    $('form').submit(function(e){

      e.preventDefault()

      socket.emit('chat message', {message: $('#m').val(), user: $('#m').attr('data-user')});

      $('#messages').append($('<li>').text(`${$('#m').attr('data-user')}: ${$('#m').val()}`));
      $('#m').val('');

      return false;
    });

    nicknameForm.on('keyup', () =>{
      if($('#user-nickname').val() !== ''){
        nicknameSubmit.prop('disabled', false);
      } else {
        nicknameSubmit.prop('disabled', true);
      }
    })

    nicknameSubmit.click(() =>{
      console.log(nicknameForm.val())
      $('#m').attr('data-user', `${$('#user-nickname').val()}`)
      socket.emit('user signon', $('#user-nickname').val())
      nicknameForm.val('')
      nicknameForm.prop('disabled', true);
      nicknameSubmit.prop('disabled', true);
    })

    let eventCounter = 0;
    $('#m').on('keypress', ()=>{
      eventCounter ++;
      if (eventCounter === 1){
        socket.emit('typing', `${$('#m').attr('data-user')} is typing a message...`)
      } else {
        setTimeout(() =>{
          socket.emit('nottyping')
          eventCounter = 0;
        }, 1500)
      }
    })

    // $('#m').on('keyup', ()=>{
    // })

    socket.on('receive message', function(data){
      $('#messages').append($('<li>').text(`${data.user}: ${data.message}`));
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

    socket.on('signon event', (user) =>{
      $('#messages').append($('<li>').text(`${user} has signed registered to the chatroom.`));
    })
  });
