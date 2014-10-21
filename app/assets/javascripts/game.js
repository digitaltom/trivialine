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
  message = JSON.parse(msg.data)

  if (message['players']) {
    $('ul#players').html('')
    message['players'].forEach(function(player) {
      $('ul#players').append('<li>' + player + '</li>')
    })
  }

}
