var host = "ws://localhost:3000/game/socket"
var socket

$(document).ready(function () {
  if (!("WebSocket" in window)) {
    console.log('Socket not available')
  } else {
    connect()
  }
})


function connect() {
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


function send(text){

  try{
    socket.send(text)
  } catch(exception){
    console.log('Socket send error: ' + exception)
  }

}


