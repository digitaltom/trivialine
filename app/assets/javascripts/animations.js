// functions for animations in general
$(document).on("ready", function() {
  var parallaxSettings = { 
    initialOpacity: 1,
    opacitySpeed: 1
  };
  parallaxImgScroll(parallaxSettings);
  
  // for test mode only
  $("#hideTestArea").on("click", function(){
    $(".testArea").fadeOut();
  });

  // top menu buttons
  $('.smoothScroll').click(function() {
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
      return false;
    }
  });
});


