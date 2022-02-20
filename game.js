// Array for storing button colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Array to store new pattern
var gamePattern = [];

// Array stores the id of the button clicked by the user
var userClickedPattern = [];

// Checks whether game has been started with initial keyboard press
var gameStart = false;

// tracks the current level or iteration of the game
var level = 0;

// Checks for a keyboard press on the page, then checks if gameStart is true;
// if not true, sets h1 to display current level, start nextSequence, and change gameStart to true;
$(document).keypress(function(){
  if (!gameStart){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

// Creates a click event handler event for all .btn elements
$(".btn").click(function(){
  // creates a variable that recognizes $(this) as the button pressed and grabs its id to store in the variable with .attr
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  // runs checkAnswer function after a button click, feeding it the length of the array -1
  // you have to subtract 1 because the length can't be 0 but the position can be 0.
  // so level 1 will have a length of 1 after the button click, but you subtract it to 0 to check the 0 position in the array within the function
  checkAnswer(userClickedPattern.length-1);

});


// function used to create next pattern sequence
function nextSequence(){

  // Resets the user input array every new round, to accurately check if the user is selecting every button every round
  userClickedPattern = [];

  // increase level variable for display purposes
  level++;

  // sets h1 text to change as level increases
  $("#level-title").text("Level " + level);

  // Random number developed between 0 and 3
  var randomNumber =Math.floor(Math.random() * 4);

  // New variable to store randomly selected number position within the color array
  var randomChosenColor = buttonColors[randomNumber];

  // Sends the randomly chosen color to gamePattern
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}


// Function to play audio associated with button color
function playSound(name){
  var colorAudio = new Audio("sounds/"+ name + ".mp3");
    colorAudio.play();
}

// function to animate mouse press on button
function animatePress(currentColor){
  // selects element via id and adds class pressed
  $("#" + currentColor).addClass("pressed")

  // function used to remove pressed class after 100 milliseconds
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// function used to check the player's answer against the recorded random pattern
function checkAnswer(currentLevel){
  // checks if the most recent button click currentLevel was the same button recorded in both arrays
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    // to help with debugging
    // console.log("success");

    // if statement to check if the player has pressed the same amount of buttons as the existing pattern
    if (userClickedPattern.length === gamePattern.length){
      // after 1000 milliseconds it will run nextSequence
      setTimeout(function() {
        nextSequence();
      }, 1000);
      }

    } else {
      // else is the default lose state
      // to help with debugging
      // console.log("wrong");

      playSound("wrong");
      // adds game-over style class to the html body
      $("body").addClass("game-over")

      // function used to remove game-over class after 200 milliseconds
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      // changes h1 text upon lose state
      $("h1").text("Game Over, Press Any Key To Restart");

      startOver();

    }

  }

  function startOver(){
    level = 0;
    gameStart = false;
    gamePattern = [];

  }
