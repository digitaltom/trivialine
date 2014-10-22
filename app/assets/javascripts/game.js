$(document).on('click', '#join_game', function () {

  socket_close()
  socket_connect()

  socket.onopen = function () {
    socket_send('join', { name: $('#player_name').val() })
    logged_in()
  }
  socket.onmessage = message_handler

})


$(document).on('click', '#chat_send', function () {
  socket_send('chat', { message: $('#chat_input').val() })
})


$(document).on('click', '#start_game', function () {
  $.get("game/start")
})


$(document).on('click', '.answer', function () {
  socket_send('answer', { question_id: $('#question').attr('data-question-id'),
    answer_id: $(this).data('answer-id') })
})


function message_handler(msg) {
  console.log('Game Socket incoming:: ' + msg.data)
  message = JSON.parse(msg.data)

  if (message['players']) {
    update_players(message['players'])
  } else if (message['question']) {
    show_question(message['question'])
  } else if (message['answer']) {
    show_answer(message['answer'])
    // if answer is correct, render next question
  } else if (message['chat']) {
    show_chat(message['chat'])
  }

}


function logged_in() {
  $('#player-name').hide()
  $('#chat').show()
  $('#start_game').show()
}


function update_players(players) {
  $('ul#players').html('')
  message['players'].forEach(function (player) {
    $('ul#players').append('<li>' + player + '</li>')
  })
}


function show_question(question) {
  $('#question').html(question['question'])
  $('#question').attr('data-question-id', question['id'])
  $('ul#answers').html('')
  shuffle(question['answers']).forEach(function (answer) {
    $('ul#answers').append('<li class="answer" data-answer-id="' + answer['id'] + '">' + answer['answer'] + '</li>')
  })
  $('#game').show()
}


function show_answer(answer) {

}


function show_chat(chat) {
  $('#chat-content').append(chat['sender'] + ': ' + chat['message'] + '<br/>')
}


function shuffle(array) {
  return array.sort(function () {
    return (Math.round(Math.random()) - 0.5)
  })
}
