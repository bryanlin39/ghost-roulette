function Player(name, isTurn, choseGhost) {
  this.name = name;
  this.isTurn = isTurn;
  this.choseGhost = choseGhost;
}

var player1 = new Player("player1", true, false);
var player2 = new Player("player2", false, false);

function flipCard(card) {
  if (card.hasClass("ghost")) {
    if (player1.isTurn === true) {
      player1.choseGhost = true;
      alert("YOU LOSE 1")
    } else {
      player2.choseGhost = true;
      alert("YOU LOSE 2")
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
  playerTurn();
  $(".col-md-3").click(function() {
    $(this).find(".front").show();
    $(this).find(".back").hide();
    var card = $(this);
    flipCard(card);
    playerTurn();
    console.log(player1);
  });
});
