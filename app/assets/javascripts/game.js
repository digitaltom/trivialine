var host = "ws://localhost:3000/game/socket"
var socket

$(document).ready(function () {
  if (!("WebSocket" in window)) {
    console.log('Socket not available')
  } else {
    socket_connect()
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

function socket_send(text){

  try{
    socket.send(text)
  } catch(exception){
    console.log('Socket send error: ' + exception)
  }

}


