$(document).ready(function(){
  $(".btn").disabled = false;
  loadPanel();
});
function loadPanel(){
  var button = "";
  debugger;
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      button += "<button type='button'  class='btn'></button>";
    }
    $(".panel").append(button);
    button = "<br>";
  }

}
