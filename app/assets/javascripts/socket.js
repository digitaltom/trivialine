var host = 'ws://' + window.location.host + '/game/socket'
var socket

$(document).ready(function () {
  if (!("WebSocket" in window)) {
    console.log('Socket not available')
  }
})


function socket_connect() {
  try {

    socket = new WebSocket(host)

    socket.onopen = function () {
      console.log('Socket Status: ' + socket.readyState + ' (Opened)')
    }

    socket.onmessage = function (msg) {
      console.log('Socket incoming:: ' + msg.data)
    }

    socket.onclose = function () {
      console.log('Socket Status: ' + socket.readyState + ' (Closed)')
    }

  } catch (exception) {
    console.log('Socket Error: ' + exception)
  }
}

function socket_close() {
  socket.close()
}

function socket_send(type, content) {

  var msg = {
    type: type,
    content: content
  }

  try {
    console.log('Socket send: ' + JSON.stringify(msg))
    socket.send(JSON.stringify(msg))
  } catch (exception) {
    console.log('Socket send error: ' + exception)
  }

}


