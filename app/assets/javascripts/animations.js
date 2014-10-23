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
  
  // for test mode only
  $("#hideTestArea").on("click", function(){
    $(".testArea").fadeOut();
  });

  // top menu buttons
  $('.smoothScroll').on("click", smoothScroll);
});

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

$(window).on("load", function(){
  $("#homepage").show();
  chatWindowSize()
})
$(window).on("resize", function(){
  chatWindowSize()
})

function showGamePage() {
  $("html, body").animate({ scrollTop: 0 }, 800, function(){
    $('#gamepage').show()
    $("#home-buttons").hide(function(){
      $("#game-buttons").show()
    })
  });
}

function chatWindowSize() {
  var windowHeight = $(window).height();
  var usernameWrapHeight = $("#userwrap").height();
  var chatWrapHeight = $("#chatwrap").height();

  var newSizeUserList = windowHeight - usernameWrapHeight - chatWrapHeight - 80;

  $("#usersListWrap").height(newSizeUserList)
}

