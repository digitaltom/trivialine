var username
var countdown_timeout = 10
var countdown_value
var countdown_interval = null

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
  } else if (message['answer']) {
    stop_countdown()
    show_answer(message['answer'])
    show_question(message['question'])
  } else if (message['question']) {
    stop_countdown()
    show_question(message['question'])
  } else if (message['chat']) {
    show_chat(message['chat'])
    $('#chat-content').animate({scrollTop: $('#chat-content').prop("scrollHeight")}, 500);
  }

}


function logged_in() {
  username = $('#player_name').val()
  socket_send('join', { name: username })
  $('#player-name').hide()
  openChatRoom()
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


function stop_countdown() {
  // reset first
  countdown_value = countdown_timeout + 1; // seconds to change to next question + 1 to start in the right number
  $(".countdown").html(countdown_timeout);
  clearInterval(countdown_interval); 
}


function countdown_nextquestion() {
  
  countdown_value--;
  $(".countdown").html(countdown_value);
  if(countdown_value == 0) {
    stop_countdown()
    // change to next question
    show_question(message['question'])
  } 
}



function show_question(question) {

  $('#homepage').hide()
  showGamePage()
  $('#game').hide()
  $('#question').html(question['question'])
  $('#question').attr('data-question-id', question['id'])
  $('ul#answers').html('')
  shuffle(question['answers']).forEach(function (answer) {
    $('ul#answers').append('<li class="answer" data-answer-id="' + answer['id'] + '">' + answer['answer'] + '</li>'),
    $(".category").html('<div class="' + question['category'] + '"></div><h4>' + question['category'] + '</h4>')
  })
  $('#game').fadeIn()

  countdown_interval = setInterval(function(){countdown_nextquestion()}, 1000);

}


function show_answer(answer) {
  // answer_id is referring to data-answer-id
  console.log('Answer incoming: ' + answer['answer_id'] + ' ' + answer['player_name'] + ' ' + answer['correct'])
}


function show_chat(chat) {
  $('#chat-content ul').append("<li><strong>"+chat['sender'] + '</strong>: ' + chat['message'] + '</li>')
}


function shuffle(array) {
  return array.sort(function () {
    return (Math.round(Math.random()) - 0.5)
  })
}
