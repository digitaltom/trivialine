$(document).on('click', '#join_game', function () {

  socket_close()
  socket_connect()

  socket.onopen = function () {
    socket_send('join', {name: $('#player_name').val()})
  }
  socket.onmessage = message_handler

})


function message_handler (msg) {
  console.log('Game Socket incoming:: ' + msg.data)

  $('#players').html(msg.data)

}
