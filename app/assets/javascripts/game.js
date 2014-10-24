var username

$(document).on('submit', '#join_game', function () {
  if ($('#player_name').val() != '') {
    socket_close()
    socket_connect()
    socket.onopen = logged_in
    socket.onmessage = message_handler
    socket.onclose = logged_out
  }
  return false
})


$(document).on('submit', '#chat_send', function () {
  if ($('#chat_input').val() != '') {
    socket_send('chat', { message: $('#chat_input').val() })
    $("#chat_input").val("")
  }
  return false
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
    $('#chat-content').animate({scrollTop: $('#chat-content').prop("scrollHeight")}, 500);
  }

}


function logged_in() {
  username = $('#player_name').val()
  socket_send('join', { name: username })
  $('#player-name').hide()
  $('#chat').show()
  $('#start_game').show()
  $(".username").html(username)
  $('html,body').animate({
    scrollTop: $("#ocean").offset().top
  }, 2000)
}

function logged_out() {
  username = ''
  $('#player-name').show()
  $('#chat').hide()
  $('#start_game').hide()
  $('#homepage').show()
  $('#gamepage').hide()
}


function update_players(players) {
  $('ul.players-list').html('')
  Object.keys(message['players']).forEach(function (player_name) {
    $('ul.players-list').append('<li>' + player_name + ' (' + message['players'][player_name]['score'] + ')</li>')
    $("#score").html(message['players'][username]['score'])

  })
}


function show_question(question) {
  $('#homepage').hide()
  showGamePage()
  $('#game').hide()
  $('#question').html(question['question'])
  $('#question').attr('data-question-id', question['id'])
  $('ul#answers').html('')
  shuffle(question['answers']).forEach(function (answer) {
    $('ul#answers').append('<li class="answer" data-answer-id="' + answer['id'] + '">' + answer['answer'] + '</li>')
  })
  $('#game').fadeIn()
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
