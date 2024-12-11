var button_colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function (){
    if(!started){
        $("#level-title").text("Level" + level);
        Sequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    clicked_button(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });


function checkAnswer(currentLevel){         //checking user's input pattern

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                Sequence();
            },1000);
        }
    } 
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game-Over, Press any key to Re-start");

        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);

        startOver();
    }
}


function Sequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);
    var randNo = Math.floor(Math.random() * 4);
    var randChosenClr = button_colors[randNo];
    gamePattern.push(randChosenClr);

    $("#"+randChosenClr).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randChosenClr);
}

function clicked_button(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}


function playSound(name){
    var aud = new Audio("./sounds/"+name+".mp3");
    aud.play();
}



function startOver(){          //restarting
    level = 0;
    gamePattern = [];
    started = false;
}