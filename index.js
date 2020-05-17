let buttonColors = ["red", "blue", "green", "yellow"];
let buttonAudio = 
    {
        "red": new Audio("sounds/red.mp3"), 
        "blue": new Audio("sounds/blue.mp3"),
        "green": new Audio("sounds/green.mp3"),
        "yellow": new Audio("sounds/yellow.mp3"),       
        "wrong": new Audio("sounds/wrong.mp3")
    }
let gamePattern = []
let userClickedPattern = []
let level = 0;

function nextSequence() {
    const randomNumber = Math.floor(Math.random()*4) + 1
    let randomChosenColor = buttonColors[randomNumber];
    console.log("rand :" + randomChosenColor);
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    // buttonAudio[randomChosenColor].play();  // unable to autoplay
    level++;
    $("h1").text("Level " + level);
}

$(document).keypress( function() {
    nextSequence();
});

$(".btn").click( function() {
    if (level > 0) {
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        buttonAudio[userChosenColor].play();
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    }
    
})

function animatePress(currentColor) {
    $("#"+currentColor).fadeOut(100).fadeIn(100);
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100)
    
}

function checkAnswer(currentLevel) {
    console.log(gamePattern);
    console.log(userClickedPattern);
    if ( gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
        console.log("success");
        if(currentLevel+1 === gamePattern.length) {
            setTimeout(()=> { 
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}