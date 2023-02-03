var buttonColours = ["red", "blue", "green", "yellow"]
var blue = new Audio("sounds/blue.mp3");
var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");

blue.volume = 0.3;
green.volume = 0.3;
red.volume = 0.3;
yellow.volume = 0.3;
wrong.volume = 0.3;

// let music = new Audio({
//     loop: true,
//     volume: 1,
//     src: ['/yourSounds/music.mp3']
// })

var gamePattern = []
var userClickedPattern = []

var started = 0; 
var level = 0;

$(document).keypress(function(){
    started += 1;
    if (started == 1) {
        nextSequence();
    }
});
function nextSequence(){
    $("#level-title").text("Level " + level);
    level += 1;
    console.log("level " + level)

    var randomNumber = Math.floor(Math.random() * 4);
    var color = buttonColours[randomNumber]

    $("#" + color).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
    // or use this given in class
    // $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(color);
    gamePattern.push(color)
}

// For user button clicks 
$(document).ready(function() {
    $("#red").bind("click",function(e){
        var userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour)
        animatePress("red")
        checkAnswer();

        playSound("red");
    });
    $("#blue").bind("click",function(e){
        var userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour)
        animatePress("blue")
        checkAnswer();

        playSound("blue");
    });
    $("#green").bind("click",function(e){
        var userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour)
        animatePress("green")
        checkAnswer();

        playSound("green");
    });
    $("#yellow").bind("click",function(e){
        var userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour)
        animatePress("yellow")
        checkAnswer();

        playSound("yellow");
    });
});

// Plays sound based on recieved color
function playSound(color){
    switch(color){
        case "blue":
            // var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            // var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "red":
            // var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "yellow":
            // var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        case "wrong":
            // var yellow = new Audio("sounds/yellow.mp3");
            wrong.play();
            break;
    }
}
// animation with pressed class for buttons
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}
function startOver(){
    level = 0 
    gamePattern = []
    userClickedPattern = []
    started = 0
}
function checkAnswer(){
    var success = false
// checks entire pattern at the once there is the same amount of colors chosens
    if (gamePattern.length == userClickedPattern.length){
        for (i = 0; i < gamePattern.length; i++){
            if (gamePattern[i] == userClickedPattern[i]){
                success = true
            }
            else {
                success = false
                break;
            }    
        }
        // after for loop, uses ''
        if (success == true){
            userClickedPattern.length = []
            setTimeout(nextSequence, 1000)
        }
        else if (success == false){
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200)
            setTimeout(playSound("wrong"), 1000)
            startOver()
        }
    }
    else 
        if (gamePattern[userClickedPattern.length - 1] != userClickedPattern.at(-1)){
            success == false
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200)
            setTimeout(playSound("wrong"), 1000)
            startOver()
        }
    }
