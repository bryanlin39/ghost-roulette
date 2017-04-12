function Player(name, isTurn, choseGhost, points) {
  this.name = name;
  this.isTurn = isTurn;
  this.choseGhost = choseGhost;
  this.points = points;
}

var player1 = new Player("player1", true, false, 0);
var player2 = new Player("player2", false, false, 0);

var ghostSelect = 0;
var deadEnd = 0;
var round = 1;

function randomNum() {
  return Math.ceil(Math.random()*16);
}

function cardClick() {
  var card = $(this);
  if(this.className==="col-md-3 " + ghostSelect){
    $("." + ghostSelect).find(".ghost").show();
    $("." + ghostSelect).find(".back").hide();
    $("." + ghostSelect).addClass("ghostCard");
    flipCard(card);
  } else if(this.className==="col-md-3 " + deadEnd) {
    $("." + deadEnd).find(".dead-end").show();
    $("." + deadEnd).find(".back").hide();
    $("." + deadEnd).addClass("deadEndCard");
    flipCard(card);
  } else if(this.className==="col-md-3 " + minus2) {
    $("." + minus2).find(".minus2").show();
    $("." + minus2).find(".back").hide();
    $("." + minus2).addClass("minus2Card");
    flipCard(card);
  } else {
    $(this).find(".front").show();
    $(this).find(".back").hide();
    flipCard(card);
  }
}

function determineWinner() {
  if (player1.points > player2.points) {
    return "Player 1 wins!";
  } else if (player2.points > player1.points) {
    return "Player 2 wins!";
  } else {
    return "DRAW";
  }
}

function flipCard(card) {
  if (card.hasClass("ghostCard")) {
    clickedGhost();
  } else if(card.hasClass("deadEndCard")) {
    clickedDeadEnd();
  } else if(card.hasClass("minus2Card")) {
    clickedMinus2();
  } else if (player1.isTurn === true) {
    player1.points += 1;
    $("#player1Points").text(player1.points);
    $("#player1-animation").text("+1").show().delay(300).fadeOut().removeClass().addClass("plus-animation");
  } else {
    player2.points += 1;
    $("#player2Points").text(player2.points);
    $("#player2-animation").text("+1").show().delay(300).fadeOut().removeClass().addClass("plus-animation");
  }
}

function clickedMinus2() {
  if (player1.isTurn === true) {
    player1.points -= 2;
    $("#player1Points").text(player1.points);
    $("#player1-animation").text("-2").show().delay(300).fadeOut().removeClass().addClass("minus-animation");
  } else {
    player2.points -= 2;
    $("#player2Points").text(player2.points);
    $("#player2-animation").text("-2").show().delay(300).fadeOut().removeClass().addClass("minus-animation");
  }
}

function clickedDeadEnd() {
  if (player1.isTurn === true) {
    player1.isTurn = false;
    player2.isTurn = true;
    playerTurn();
    $("#player1-animation").text("DEAD  END").show().delay(300).fadeOut().addClass("deadend-animation");
  } else {
    player2.isTurn = false;
    player1.isTurn = true;
    playerTurn();
    $("#player2-animation").text("DEAD  END").show().delay(300).fadeOut().addClass("deadend-animation");
  }
}

function clickedGhost() {
  $(".col-md-3").off("click", cardClick);
  if (player1.isTurn === true) {
    player1.choseGhost = true;
    player1.points -= 4;
    player1.isTurn = false;
    player2.isTurn = true;
    playerTurn();
    $("#player1Points").text(player1.points);
    $("#player1-animation").text("-4").show().delay(300).fadeOut().removeClass().addClass("minus-animation");
    if (round === 5) {
      $("#final-dialog").dialog("open");
      $(".ui-dialog-titlebar-close").remove();
      $(".winner").text(determineWinner());
    } else {
      $("#dialog").dialog("open");
      $(".ui-dialog-titlebar-close").remove();
    }
  } else {
    player2.choseGhost = true;
    player2.points -= 4;
    player2.isTurn = false;
    player1.isTurn = true;
    playerTurn();
    $("#player2Points").text(player2.points);
    $("#player2-animation").text("-4").show().delay(300).fadeOut().removeClass().addClass("minus-animation");
    if (round === 5) {
      $("#final-dialog").dialog("open");
      $(".ui-dialog-titlebar-close").remove();
      $(".winner").text(determineWinner());
    } else {
      $("#dialog").dialog("open");
      $(".ui-dialog-titlebar-close").remove();
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
  $("#round").text(round);
  ghostSelect = randomNum();
  deadEnd = randomNum();
  while (deadEnd === ghostSelect) {
    deadEnd = randomNum();
  }
  minus2 = randomNum();
  while (minus2 === ghostSelect || minus2 === deadEnd) {
    minus2 = randomNum();
  }
  console.log(ghostSelect);
  console.log(deadEnd);
  console.log(minus2);

  $("#dialog").dialog({
   autoOpen: false,
   height: 700,
   width: 700,
   draggable: true,
   resizable: false,
   closeOnEscape: false
 });

  $("#final-dialog").dialog({
    autoOpen: false,
    height: 700,
    width: 700,
    draggable: true,
    resizable: false,
    closeOnEscape: false
  });

 $("#game-start").click(function(){
   $(".intro").hide();
   $("#game").show();
 });

  playerTurn();
  $(".col-md-3").one("click", cardClick);

  $("#end-turn").click( function() {
    if (player1.isTurn === true) {
      player1.isTurn = false;
      player2.isTurn = true;
      playerTurn();
    } else {
      player2.isTurn = false;
      player1.isTurn = true;
      playerTurn();
    }
  });

  $("#play-again").click(function() {
    round += 1;
    $("#round").text(round);
    $(".col-md-3").one("click", cardClick);
    $(".front").hide();
    $(".back").show();
    $(".ghost").hide();
    $(".dead-end").hide();
    $(".minus2").hide();
    $("#dialog").dialog("close");
    $("." + ghostSelect).removeClass("ghostCard");
    $("." + deadEnd).removeClass("deadEndCard");
    $("." + minus2).removeClass("minus2Card");
    ghostSelect = randomNum();
    deadEnd = randomNum();
    while (deadEnd === ghostSelect) {
      deadEnd = randomNum();
    }
    minus2 = randomNum();
    while (minus2 === ghostSelect || minus2 === deadEnd) {
      minus2 = randomNum();
    }
    player1.choseGhost = false;
    player2.choseGhost = false;
    console.log(ghostSelect);
    console.log(deadEnd);
    console.log(minus2);
  });

  $("#restart").click(function() {
    round = 1;
    player1.points = 0;
    player2.points = 0;
    player1.isTurn = true;
    player2.isTurn = false;
    player1.choseGhost = false;
    player2.choseGhost = false;
    $("#round").text(round);
    $("#player1Points").text(player1.points);
    $("#player2Points").text(player2.points);
    $(".col-md-3").one("click", cardClick);
    $(".front").hide();
    $(".back").show();
    $(".ghost").hide();
    $(".dead-end").hide();
    $(".minus2").hide();
    $("#final-dialog").dialog("close");
    $("." + ghostSelect).removeClass("ghostCard");
    $("." + deadEnd).removeClass("deadEndCard");
    $("." + minus2).removeClass("minus2Card");
    ghostSelect = randomNum();
    deadEnd = randomNum();
    while (deadEnd === ghostSelect) {
      deadEnd = randomNum();
    }
    minus2 = randomNum();
    while (minus2 === ghostSelect || minus2 === deadEnd) {
      minus2 = randomNum();
    }
    $(".intro").show();
    $("#game").hide();
    playerTurn();
  });
});
