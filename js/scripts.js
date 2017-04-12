function Player(name, isTurn, choseGhost, points) {
  this.name = name;
  this.isTurn = isTurn;
  this.choseGhost = choseGhost;
  this.points = points;
}

var player1 = new Player("player1", true, false, 0);
var player2 = new Player("player2", false, false, 0);

var round = 1;
var cardsFlipped = 0;

var ghostSelect = 0;
var deadEnd = 0;
var minus2 = 0;
var diamond1 = 0;
var diamond2 = 0;
var diamond3 = 0;
var diamondCounter1 = 0;
var diamondCounter2 = 0;
var deadEnd2 = 0;
var minus22 = 0;

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
  } else if (this.className==="col-md-3 " + diamond1) {
    $("." + diamond1).find(".diamond").show();
    $("." + diamond1).find(".back").hide();
    $("." + diamond1).addClass("diamondCard");
    flipCard(card);
  } else if (this.className==="col-md-3 " + diamond2) {
    $("." + diamond2).find(".diamond").show();
    $("." + diamond2).find(".back").hide();
    $("." + diamond2).addClass("diamondCard");
    flipCard(card);
  } else if (this.className==="col-md-3 " + diamond3) {
    $("." + diamond3).find(".diamond").show();
    $("." + diamond3).find(".back").hide();
    $("." + diamond3).addClass("diamondCard");
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
    return "DRAW!";
  }
}

function flipCard(card) {
  cardsFlipped ++;
  if (card.hasClass("ghostCard")) {
    clickedGhost();
  } else if(card.hasClass("deadEndCard")) {
    clickedDeadEnd();
  } else if(card.hasClass("minus2Card")) {
    clickedMinus2();
  } else if (card.hasClass("diamondCard")) {
    diamond();
  } else if (player1.isTurn === true) {
    player1.points += 1;
    $("#player1Points").text(player1.points);
    $("#player1-animation").text("+1").show().delay(450).fadeOut().removeClass().addClass("plus-animation");
  } else {
    player2.points += 1;
    $("#player2Points").text(player2.points);
    $("#player2-animation").text("+1").show().delay(450).fadeOut().removeClass().addClass("plus-animation");
  }
}

function clickedMinus2() {
  if (player1.isTurn === true) {
    player1.points -= 2;
    $("#player1Points").text(player1.points);
    $("#player1-animation").text("-2").show().delay(450).fadeOut().removeClass().addClass("minus-animation");
  } else {
    player2.points -= 2;
    $("#player2Points").text(player2.points);
    $("#player2-animation").text("-2").show().delay(450).fadeOut().removeClass().addClass("minus-animation");
  }
}

function clickedDeadEnd() {
  if (player1.isTurn === true) {
    player1.isTurn = false;
    player2.isTurn = true;
    playerTurn();
    $("#player1-animation").text("Dead End").show().delay(450).fadeOut().removeClass().addClass("deadend-animation");
  } else {
    player2.isTurn = false;
    player1.isTurn = true;
    playerTurn();
    $("#player2-animation").text("Dead End").show().delay(450).fadeOut().removeClass().addClass("deadend-animation");
  }
}

function clickedGhost() {
  $(".col-md-3").off("click", cardClick);
  $("#end-turn").off("click", endTurn);
  if (player1.isTurn === true) {
    player1.choseGhost = true;
    player1.points -= 4;
    player1.isTurn = false;
    player2.isTurn = true;
    // playerTurn();
    $("#player1Points").text(player1.points);
    $("#player1-animation").text("-4").show().delay(450).fadeOut().removeClass().addClass("minus-animation");
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
    // playerTurn();
    $("#player2Points").text(player2.points);
    $("#player2-animation").text("-4").show().delay(450).fadeOut().removeClass().addClass("minus-animation");
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
  cardsFlipped = 0;
  if(player2.isTurn===true) {
    $("#player1").removeClass("player1Turn");
    $("#player2").addClass("player2Turn");
    $("#player2-animation").text("Your Turn").show().delay(450).fadeOut().removeClass().addClass("player2-turn-animation");
  } else {
    $("#player1").addClass("player1Turn");
    $("#player2").removeClass("player2Turn");
    $("#player1-animation").text("Your Turn").show().delay(450).fadeOut().removeClass().addClass("player1-turn-animation");
  }
}

function endTurn() {
  if (cardsFlipped < 1) {
    alert("You must flip at least one card before ending your turn!")
;  } else if (player1.isTurn === true) {
    player1.isTurn = false;
    player2.isTurn = true;
    playerTurn();
  } else {
    player2.isTurn = false;
    player1.isTurn = true;
    playerTurn();
  }
}

function diamond() {
  if (player1.isTurn === true) {
    diamondCounter1 += 1;
  }
  if (player2.isTurn === true) {
    diamondCounter2 += 1;
  }
  console.log("diamondCounter1 ", diamondCounter1);
  console.log("diamondCounter2 ", diamondCounter2);

  if (diamondCounter1 === 2 && player1.isTurn === true) {
    player1.points += 3;
    $("#player1Points").text(player1.points);
    $("#player1-animation").text("+3").show().delay(450).fadeOut().removeClass().addClass("plus-animation");
  }
  if (diamondCounter2 === 2 && player2.isTurn === true) {
    player2.points += 3;
    $("#player2Points").text(player2.points);
    $("#player2-animation").text("+3").show().delay(450).fadeOut().removeClass().addClass("plus-animation");
  }
  if (diamondCounter1 === 3 && player1.isTurn === true) {
    player1.points += 5;
    $("#player1Points").text(player1.points);
    $("#player1-animation").text("+5").show().delay(450).fadeOut().removeClass().addClass("plus-animation");
  }
  if (diamondCounter2 === 3 && player2.isTurn === true) {
    player2.points += 5;
    $("#player2Points").text(player2.points);
    $("#player2-animation").text("+5").show().delay(450).fadeOut().removeClass().addClass("plus-animation");
  }
}

function setSpecialCards() {
  ghostSelect = randomNum();
  deadEnd = randomNum();
  while (deadEnd === ghostSelect) {
    deadEnd = randomNum();
  }
  minus2 = randomNum();
  while (minus2 === ghostSelect || minus2 === deadEnd) {
    minus2 = randomNum();
  }
  diamond1 = randomNum();
  while (diamond1 === ghostSelect || diamond1 === deadEnd || diamond1 === minus2) {
    diamond1 = randomNum();
  }
  diamond2 = randomNum();
  while (diamond2 === ghostSelect || diamond2 === deadEnd || diamond2 === minus2 || diamond2 === diamond1) {
    diamond2 = randomNum();
  }
  diamond3 = randomNum();
  while (diamond3 === ghostSelect || diamond3 === deadEnd || diamond3 === minus2 || diamond3 === diamond1 || diamond3 === diamond2) {
    diamond3 = randomNum();
  }
  deadEnd2 = randomNum();
  while (deadEnd2 === ghostSelect || deadEnd2 === deadEnd || deadEnd2 === minus2 || deadEnd2 === diamond1 || deadEnd2 === diamond2 || deadEnd2 === diamond3) {
    deadEnd2 = randomNum();
  }
  minus22 = randomNum();
  while (minus22 === ghostSelect || minus22 === deadEnd || minus22 === minus2 || minus22 === diamond1 || minus22 === diamond2 || minus22 === diamond3 || minus22 === deadEnd2) {
    minus22 = randomNum();
  }
}

function setNewRound() {
  player1.choseGhost = false;
  player2.choseGhost = false;
  diamondCounter1 = 0;
  diamondCounter2 = 0;
  $("#round").text(round);
  $("#player1Points").text(player1.points);
  $("#player2Points").text(player2.points);
  $(".col-md-3").one("click", cardClick);
  $("#end-turn").on("click", endTurn);
  $(".front").hide();
  $(".back").show();
  $(".ghost").hide();
  $(".dead-end").hide();
  $(".minus2").hide();
  $(".diamond").hide();
  $("." + ghostSelect).removeClass("ghostCard");
  $("." + deadEnd).removeClass("deadEndCard");
  $("." + minus2).removeClass("minus2Card");
  $("." + diamond1).removeClass("diamondCard");
  $("." + diamond2).removeClass("diamondCard");
  $("." + diamond3).removeClass("diamondCard");
  setSpecialCards();
  playerTurn();
}

$(document).ready(function() {
  $("#round").text(round);
  setSpecialCards();

  console.log("ghost ",ghostSelect);
  console.log("deadEnds ",deadEnd, deadEnd2);
  console.log("minus ",minus2, minus22);
  console.log("diamonds ",diamond1, diamond2, diamond3);

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

  $("#game-start").click(function() {
    $(".intro").hide();
    $("#game").show();
    $("#player1-animation").text("Your Turn").show().delay(450).fadeOut().removeClass().addClass("player1-turn-animation");
  });

  playerTurn();
  $(".col-md-3").one("click", cardClick);
  $("#end-turn").on("click", endTurn);

  $("#next-round").click(function() {
    round += 1;
    $("#dialog").dialog("close");
    setNewRound();
    console.log("ghost ", ghostSelect);
    console.log("deadEnds ", deadEnd, deadEnd2);
    console.log("minus ", minus2, minus22);
    console.log("diamonds ", diamond1, diamond2, diamond3);
  });

  $("#restart").click(function() {
    round = 1;
    player1.points = 0;
    player2.points = 0;
    player1.isTurn = true;
    player2.isTurn = false;
    setNewRound();
    $("#final-dialog").dialog("close");
    $(".intro").show();
    $("#game").hide();
  });
});
