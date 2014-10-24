// functions for animations in general
$(document).on("ready", function() {

  // Parallax initiation
  var parallaxSettings = { 
    initialOpacity: 1,
    opacitySpeed: 1
  };
  parallaxImgScroll(parallaxSettings);

  //home page and game page hidden initially
  $("#homepage").hide();
  $("#gamepage").hide();
  $("header").hide();
  $("footer").hide();
  $("#openchat").hide();
  
  // for test mode only
  $("#hideTestArea").on("click", function(){
    $(".testArea").fadeOut();
  });

  // top menu buttons
  $('.smoothScroll').on("click", smoothScroll);

  // to close the chat room
  $("#closechat").on("click", function(){
    closeChatRoom()
  })

  // to reopen the chat room
  $("#openchat").on("click", function(){
    openChatRoom()
  })

  
});


// when the window is load we show the home page and take the final size for the chatroom
$(window).on("load", function(){
  $("#loader").fadeOut('400', function() {
    $("#homepage").fadeIn();
    $("header").fadeIn();
    $("footer").fadeIn();  
  });
  chatWindowSize()
})

// if the window is resized we take the size for the chatroom
$(window).on("resize", function(){
  chatWindowSize()
})


function smoothScroll() {
  var target = $(this).data("linkto");
  if($(this).hasData("margin-top")) {
    var marginTop = $(this).data("margin-top"); 
  } else {
    var marginTop = 0;
  }

  if (target.length) {
    $('html,body').animate({
      scrollTop: $("#"+target).offset().top - marginTop
    }, 2000);
  }
}



function showGamePage() {
  $("html, body").animate({ scrollTop: 0 }, 800, function(){
    $('#gamepage').show()
    $("#home-buttons").hide(function(){
      $("#game-buttons").show()
    })
  });
}


function closeChatRoom() {
  console.log("sfas")
  $("#chat").hide();
  $("#openchat").show();
}

function openChatRoom() {
  $("#chat").show()
  $("#openchat").hide();
}


function chatWindowSize() {
  var windowHeight = $(window).height();
  var usernameWrapHeight = $("#userwrap").height();
  var chatWrapHeight = $("#chatwrap").height();

  var newSizeUserList = windowHeight - usernameWrapHeight - chatWrapHeight - 80;

  $("#usersListWrap").height(newSizeUserList)
}

