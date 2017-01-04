$(document).ready(function(){
  var row = 0;
  var turn = "";
  var player_1="";
  var player_2="";
  //red

  position_player2 = [];
  //green
  position_player1 = [];
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
  for (var i = 0; i < 6; i++){
    if($("."+row +"_"+ i+"").css("background-color") != "rgb(255, 255, 255)" ){
      cont = i - 1;
      color = (turn == 0) ? "green" : "red";
      result = (turn == 1) ? player_1 : player_2;
      $('#playerTurn').text("El turno es para " + result);
      putColor(color,cont,row);
      getPosition(player_1,player_2);
      break;
    }else if(i == 5){
      color = (turn == 0) ? "green" : "red";
      result = (turn == 1) ? player_1 : player_2;
      $('#playerTurn').text("El turno es para " + result);
      putColor(color,i,row);
      getPosition(player_1,player_2);
    }
  }
}
function putColor(color,i,row){
  $("."+row +"_"+ i +"").css("background",color);
  color = (color == "green") ? "red" : "green";
  $("#image").css("background", color);
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
  player_1 = player1;
  player_2 = player2;
  var number = Math.floor((Math.random() * 2));
  result = (number == 1) ? player2 : player1;
  $('#playerTurn').text("El turno es para " + result);
  turn = number;
}
//show image
function showimage(right){
  if(turn == 1){
    $("#image").css({
      "position":"relative",
      "right": right+"px",
      "background": "red"
    });
  }else{
    $("#image").css({
      "position":"relative",
      "right": right+"px",
    });
  }
  $("#image").show();
  $("hr").css("top","-5px");
  $(".btn").css("top","-3px");
}
//get position
function getPosition(player_1,player_2){
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 6; j++) {
      if($('.'+i+'_'+j).css("background-color") == "rgb(255, 0, 0)"){
        position_player2.push(i+"-"+j);
      }else if ($('.'+i+'_'+j).css("background-color") == "rgb(0, 128, 0)") {
        position_player1.push(i+"-"+j);

      }
    }
  }
  validateHorizontal(position_player2,player_2);
  validateHorizontal(position_player1,player_1);
  position_player1 = [];
  position_player2 = [];
}
function validateHorizontal(position,namePlayer){
var cont = 0;
var last = [];
for (var i = 0; i < position.length; i++) {
  result = position[i].split("-");
  position[i] = result[1] + "-" + result[0];
}
position = position.sort();
for (var i = 0; i < position.length; i++) {
  result = position[i].split("-");
  position[i] = result[1] + "-" + result[0];
  result = position[i].split("-");
  if(i != 0){
    if(result[0] -1 == last[0] && result[1] == last[1] ){
      cont ++;
    }else{
      cont = 0;
    }
  }else{
    cont ++;
  }
  if(cont == 4){
    alert("Gano el jugador " + namePlayer);
    $("#image").hide(1000);
    break;
  }
  last[0] = parseInt(result[0]);
  last[1] = parseInt(result[1]);
}
}
