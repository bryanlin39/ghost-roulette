function Player(name, isTurn, choseGhost, points) {
  this.name = name;
  this.isTurn = isTurn;
  this.choseGhost = choseGhost;
  this.points = points;
}

var player1 = new Player("player1", true, false, 0);
var player2 = new Player("player2", false, false, 0);

var ghostSelect = 0;
var round = 1

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
} else {
    $(this).find(".front").show();
    $(this).find(".back").hide();
    flipCard(card);
    playerTurn();
  }
}

function flipCard(card) {
  if (card.hasClass("ghostCard")) {
    if(round === 5) {
      if(player1.points>player2.points) {
        $("#final-dialog").dialog("open");
        $(".ui-dialog-titlebar-close").remove();
        $(".winner").text("Player 1")
        $(".col-md-3").off("click", cardClick);
        return;
      } else {
        $("#final-dialog").dialog("open");
        $(".ui-dialog-titlebar-close").remove();
        $(".winner").text("Player 2");
        $(".col-md-3").off("click", cardClick);
        return;
      }
    }
    if (player1.isTurn === true) {
      player1.choseGhost = true;
      player1.points -= 3;
      $("#player1Points").text(player1.points);
      $(".col-md-3").off("click", cardClick);
      $("#dialog").dialog("open");
      $(".ui-dialog-titlebar-close").remove();
    } else {
      player2.choseGhost = true;
      player2.points -= 3;
      $("#player2Points").text(player2.points);
      $(".col-md-3").off("click", cardClick);
      $("#dialog").dialog("open");
      $(".ui-dialog-titlebar-close").remove();
    }
  } else {
      if (player1.isTurn === true) {
        player1.isTurn = false;
        player2.isTurn = true;
        player1.points += 1;
        $("#player1Points").text(player1.points);
      } else {
        player2.isTurn = false;
        player1.isTurn = true;
        player2.points += 1;
        $("#player2Points").text(player2.points);
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
  console.log(ghostSelect);

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
  $(".col-md-3").on("click", cardClick);

  $("#play-again").click(function() {
    round += 1;
    $("#round").text(round);
    $(".col-md-3").on("click", cardClick);
    $(".front").hide();
    $(".back").show();
    $(".ghost").hide();
    $("#dialog").dialog("close");
    $("." + ghostSelect).removeClass("ghostCard");
    ghostSelect = randomNum();
    player1.choseGhost = false;
    player2.choseGhost = false;
    console.log(ghostSelect);

    $("#restart").click(function(){
      player1.points = 0;
      $("#player1Points").text(player1.points);
      player2.points = 0;
      $("#player2Points").text(player2.points);
      player1.isTurn = true;
      player2.isTurn = false;
      round = 1
      $("#round").text(round);
      player1.choseGhost = false;
      player2.choseGhost = false;
      $(".front").hide();
      $(".back").show();
      $(".ghost").hide();
      $(".col-md-3").on("click", cardClick);
      $("#final-dialog").dialog("close");
      $("." + ghostSelect).removeClass("ghostCard");
      ghostSelect = randomNum();
      $(".intro").show();
      $("#game").hide();
    });
  });
});
