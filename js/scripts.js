function Player(name, isTurn, choseGhost) {
  this.name = name;
  this.isTurn = isTurn;
  this.choseGhost = choseGhost;
}

var player1 = new Player("player1", true, false);
var player2 = new Player("player2", false, false);

function randomNum() {
  return Math.ceil(Math.random()*16);
}

function flipCard(card) {
  if (card.hasClass("ghostCard")) {
    if (player1.isTurn === true) {
      player1.choseGhost = true;
      $("#dialog").dialog("open");
    } else {
      player2.choseGhost = true;
      $("#dialog").dialog("open");
    }
  } else {
    if (player1.isTurn === true) {
      player1.isTurn = false;
      player2.isTurn = true;
    } else {
      player2.isTurn = false;
      player1.isTurn = true;
    }
  }
}

function playerTurn() {
  if(player2.isTurn===true) {
    $("#player1").removeClass("player1Turn");
    $("#player2").addClass("player2Turn");
  } else {
    $("#player1").addClass("player1Turn");
    $("#player2").removeClass("player2Turn");
  }
}

$(document).ready(function() {
  var ghostSelect = randomNum();

  $("#dialog").dialog({
   autoOpen: false,
   height: 500,
   width: 500,
   draggable: true,
   resizable: false,
   closeOnEscape: false
 });

  playerTurn();
  $(".col-md-3").click(function() {
    var card = $(this);
    console.log(this.className,ghostSelect)
    if(this.className==="col-md-3 " + ghostSelect){
      $("." + ghostSelect).find(".ghost").show();
      $("." + ghostSelect).find(".back").hide();
      $("." + ghostSelect).addClass("ghostCard");
      flipCard(card);
  } else {
      $(this).find(".front").show();
      $(this).find(".back").hide();
      flipCard(card);
      playerTurn();
    }
    console.log(player1);
    console.log(player2);
  });

  $("#end-button").click(function(){
    $(".front").hide();
    $(".back").show();
    $(".ghost").hide();
    $("#dialog").dialog("close");
    player1.isTurn = true;
    player2.isTurn = false;
    $("." + ghostSelect).removeClass("ghostCard");
    playerTurn();
    ghostSelect = randomNum();
    player1.choseGhost = false;
    player2.choseGhost = false;
  });

});
