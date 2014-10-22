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
});