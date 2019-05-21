$(document).ready(function(){
  $("#clickright").click(function(){
    $("#post1").css("display", "none").slideDown(2000);
  });
});

var $currDiv = $( "#start" );
$currDiv .css( "d", "red" );
$( "button" ).click(function() {
  $currDiv  = $currDiv .next();
  $( "div" ).css( "background-color", "" );
  $currDiv .css( "background-color", "red" );
});