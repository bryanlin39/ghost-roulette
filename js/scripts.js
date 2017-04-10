function Player(name, isTurn, choseGhost) {
  this.name = name;
  this.isTurn = isTurn;
  this.choseGhost = choseGhost;
}

var player1 = new Player(player1, true, false);
var player2 = new Player(player2, false, false);

function flipCard() {
  if ($(this).hasClass("ghost")) {
    if (player1.isTurn === true) {
      player1.choseGhost = true;
    } else {
      player2.choseGhost = true;
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

$(document).ready(function() {
  $(".col-md-3").click(function() {
    flipCard();
    console.log($(this).hasClass("ghost"));
  });
});
