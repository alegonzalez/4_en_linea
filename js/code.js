$(document).ready(function(){
  var row = 0;
  var turn = "";
  var player_1="";
  var player_2="";
  position_player2 = [];
  position_player1 = [];
  $('.btnGame').attr("disabled", true);
  $('.start').click(function(){
    validateAndStart($('.player_1').val(),$('.player_2').val());
  })
  $('.panel').hide();
  $("#image").hide();
  $('.gamebutton').hide();
  //event hover
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
  $('#startWithDifferentPlayer').click(function(){
    $('.player_1,.player_2').val("");
    $('.player_1,.player_2,.start').show(1000);
    $('#playerTurn').hide(1000);
    $(".panel").hide(1000);
    $('#startWithDifferentPlayer').hide(1000);
    $('#startWithSamePlayer').hide(1000);
  });
  $("#startWithSamePlayer").click(function(){
    $('.panel').empty();
    loadPanel();
    $('.panel').show(1000);
    $('#playerTurn').show();

  });
});
//This function call function for paint, and call the method  with name getPosition for validations
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
      getPosition(player_1,player_2);
      putColor(color,i,row);
    }
  }
}
//This function put color in the panel
function putColor(color,i,row){
  $("."+row +"_"+ i +"").css("background",color);
  color = (color == "green") ? "red" : "green";
  $("#image").css("background", color);
  turn = (turn == 0) ? 1 : 0;
}
//load button in the panel
function loadPanel(){
  var button = "";
  $(".panel").append("<center id='tagCenterOfImage'><div id='image'></div></center>");
  $(".panel").append("<hr>");
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      button += "<div   class='btnGame "+j+"_"+i+"'></div>";
    }
    $(".panel").append(button);
    button = "<br>";
    $(".btnGame").removeAttr("style");
    $("hr").removeAttr("style");
  }
}
//get name, validate the name and start game
function validateAndStart(player1,player2){
  if(player1 != "" && player2 != ""){
    loadPanel();
    $('.panel').show(1000);
    playerTurn(player1,player2);
    $('#playerTurn').show(1000);
    $('.player_1,.player_2,.start').hide(1000);
  }else{
    alert("Los nombres de jugadores son requeridos");
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
  $(".btnGame").css("top","-3px");
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
  if(position_player1.length != 0 && position_player2.length != 0){
    result = validateHorizontal(position_player2,player_2);
    if(result == false){
      result = validateHorizontal(position_player1,player_1);
      if(result == false){
        result = validateVertical(position_player2,player_2);
        if(result == false){
          result = validateVertical(position_player1,player_1);
          if(result == false){
            result = validateDiagonal(position_player1,player_1);
            if(result == false){
              validateDiagonal(position_player2,player_2);
            }
          }
        }
      }
    }
  }
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
    if(gameWon(cont,namePlayer) == true)
    return true;
    last[0] = parseInt(result[0]);
    last[1] = parseInt(result[1]);
  }
  return false;
}
//this function validate vertical
function validateVertical(position,namePlayer){
  var array = position[0].split("-");
  var beforeLeft = parseInt(array[0]);
  var beforeRight = parseInt(array[1]);
  var cont = 0;
  for (var i = 0; i < position.length; i++) {
    array = position[i].split("-");
    if(beforeLeft == array[0] && beforeRight == array[1]){
      cont ++;
      beforeRight += 1;
    }else{
      cont = 0;
    }
    if(gameWon(cont,namePlayer) == true)
    return true;
  }
  return false;
}
//this function validate if player won the game
function gameWon(cont,namePlayer){
  if(cont == 4){
    alert("El ganador es " + namePlayer);
    clean();
    $('.gamebutton').show();
    return true;
  }else{
    return false;
  }
}
//this function clean game
function clean(){
  $("#tagCenterOfImage").remove();
  $(".panel").hide(1000);
  $(".btnGame").hide(1000);
  $(".btnGame").remove();
  $('#playerTurn').hide(1000);
  $("hr").remove();
  $("br").remove();
  position_player2 = [];
  position_player1 = [];
}
function validateDiagonal(position,namePlayer){
  if(position.indexOf("0-5") != -1 && position.indexOf("1-4") != -1 && position.indexOf("2-3") != -1 && position.indexOf("3-2") != -1){
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("0-4") != -1 && position.indexOf("1-3") != -1 && position.indexOf("2-2") != -1 && position.indexOf("3-1") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("0-3") != -1 && position.indexOf("1-2") != -1 && position.indexOf("2-1") != -1 && position.indexOf("3-0") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("1-5") != -1 && position.indexOf("2-4") != -1 && position.indexOf("3-3") != -1 && position.indexOf("4-2") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("1-4") != -1 && position.indexOf("2-3") != -1 && position.indexOf("3-2") != -1 && position.indexOf("4-1") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("1-3") != -1 && position.indexOf("2-2") != -1 && position.indexOf("3-1") != -1 && position.indexOf("4-0") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("2-5") != -1 && position.indexOf("3-4") != -1 && position.indexOf("4-3") != -1 && position.indexOf("5-2") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("2-4") != -1 && position.indexOf("3-3") != -1 && position.indexOf("4-2") != -1 && position.indexOf("5-1") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("2-3") != -1 && position.indexOf("3-2") != -1 && position.indexOf("4-1") != -1 && position.indexOf("5-0") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("3-5") != -1 && position.indexOf("4-4") != -1 && position.indexOf("5-3") != -1 && position.indexOf("6-2") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("3-4") != -1 && position.indexOf("4-3") != -1 && position.indexOf("5-2") != -1 && position.indexOf("6-1") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("3-3") != -1 && position.indexOf("4-2") != -1 && position.indexOf("5-1") != -1 && position.indexOf("6-0") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("6-5") != -1 && position.indexOf("5-4") != -1 && position.indexOf("4-3") != -1 && position.indexOf("3-2") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("6-4") != -1 && position.indexOf("5-3") != -1 && position.indexOf("4-2") != -1 && position.indexOf("3-1") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("6-3") != -1 && position.indexOf("5-2") != -1 && position.indexOf("4-1") != -1 && position.indexOf("3-0") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("5-5") != -1 && position.indexOf("4-4") != -1 && position.indexOf("3-3") != -1 && position.indexOf("2-2") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("5-4") != -1 && position.indexOf("4-3") != -1 && position.indexOf("3-2") != -1 && position.indexOf("2-1") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("5-3") != -1 && position.indexOf("4-2") != -1 && position.indexOf("3-1") != -1 && position.indexOf("2-0") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("4-5") != -1 && position.indexOf("3-4") != -1 && position.indexOf("2-3") != -1 && position.indexOf("1-2") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("4-4") != -1 && position.indexOf("3-3") != -1 && position.indexOf("2-2") != -1 && position.indexOf("1-1") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("4-3") != -1 && position.indexOf("3-2") != -1 && position.indexOf("2-1") != -1 && position.indexOf("1-0") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("3-5") != -1 && position.indexOf("2-4") != -1 && position.indexOf("1-3") != -1 && position.indexOf("0-2") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("3-4") != -1 && position.indexOf("2-3") != -1 && position.indexOf("1-2") != -1 && position.indexOf("0-1") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }else if (position.indexOf("3-3") != -1 && position.indexOf("2-2") != -1 && position.indexOf("1-1") != -1 && position.indexOf("0-0") != -1) {
    alert("Gano el jugador " + namePlayer);
    $('.gamebutton').show();
    clean();
    return true;
  }
  return false;
}
