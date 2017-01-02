$(document).ready(function(){
  var row = 0;
  var turn = "";
  $('.btn').attr("disabled", true);
  $('.start').click(function(){
    validateAndStart($('.player_1').val(),$('.player_2').val());
  })
  $('.panel').hide();
  $("#image").hide();
  $('.panel').mousemove(function(event) {
    var left = event.pageX - $(this).offset().left;
    var top = event.pageY - $(this).offset().top;
    if (left >= 455.5) {
      row = 6;
      showimage(-210);
    }else if (left >= 382.5) {
      row = 5;
      showimage(-137);
    }else if (left >= 310.5) {
      row = 4;
      showimage(-67);
    }else if (left >= 234.5) {
      row = 3;
      showimage(4);
    }else if (left >= 163.5) {
      row = 2;
      showimage(76);
    }else if (left >= 90.5) {
      row = 1;
      showimage(147);
    }else  if(left >= 18.5){
      row = 0;
      showimage(217);
    }
  });
  $('.panel').click(function(){
    colourDiv(row);
  });
});
function colourDiv(row){
  var cont = 0;
  var color = "";
  debugger;
  for (var i = 0; i < 6; i++){
    if($("."+row +"_"+ i+"").css("background-color") != "rgb(255, 255, 255)" ){
      cont = i - 1;
      color = (turn == 0) ? "green" : "red";
      putColor(color,cont,row);
      break;
    }else if(i == 5){
      color = (turn == 0) ? "green" : "red";
      putColor(color,i,row);
    }
  }
}
function putColor(color,i,row){
  $("."+row +"_"+ i +"").css("background",color);
  turn = (turn == 0) ? 1 : 0;
}
//load button in the panel
function loadPanel(){
  var button = "";
  $(".panel").append("<hr>");
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      button += "<div   class='btn "+j+"_"+i+"'></div>";
    }
    $(".panel").append(button);
    button = "<br>";
  }
}
//get name, validate the name and start game
function validateAndStart(player1,player2){
  if(player1 != "" && player2 != ""){
    loadPanel();
    $('.panel').show(1000);
    playerTurn(player1,player2);
    $('.player_1,.player_2,.start').hide(1000);
  }
}

//Player Turn start
function playerTurn(player1,player2){
  var number = Math.floor((Math.random() * 2));
  result = (number == 1) ? player2 : player1;
  $('#playerTurn').text("El turno es para " + result);
  turn = number;
}
//show image
function showimage(right){
  $("#image").show();
  $("#image").css({
    "position":"relative",
    "right": right+"px",
  });
  $("hr").css("top","-5px");
  $(".btn").css("top","-3px");
}
