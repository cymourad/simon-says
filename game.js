// Set global variables to
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

// Play sound based on passed-in color
function playSound(color) {
  // Select the color's audio and play it
  var sound = new Audio('sounds/' + color + '.mp3');
  sound.play();
}

// Animate button when pressed
function animatePress(color) {
  // Find the button
  var pressedButton = $('.' + color);

  // Apply the pressed style for 100 milliseconds
  pressedButton.addClass('pressed');
  setTimeout(function() {
    pressedButton.removeClass('pressed');
  }, 100);
}

function nextSequence() {
  // Generate random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Find the color corrresponding to this number
  var randomChosenColor = buttonColors[randomNumber];

  // Add this color to the pattern
  gamePattern.push(randomChosenColor);

  // Find the button corresponding to this color
  var chosenButton = $('#' + randomChosenColor);

  // Flash the button
  chosenButton.fadeOut(100).fadeIn(100);

  // Play sound corresponding to color
  playSound(randomChosenColor);

  // Increment level
  level++;

  // Change level disclaimer
  $('h1').text('Level ' + level);
}

// Listen for a keypress to start the game
$(document).keypress(function() {
  if (gameStarted == false) {
    gameStarted = true;
    nextSequence();
  }
});

// Listen to all buttons for a click
$('.btn').click(function(event) {
  // Identify color of button that got clicked
  var userChosenColor = event.target.id;

  // Add color to pattern chosen by user
  userClickedPattern.push(userChosenColor);

  // Play sound corresponding to color
  playSound(userChosenColor);

  // Animate button when pressed
  animatePress(userChosenColor);

  if (userClickedPattern.length >= gamePattern.length) {
    var correctPattern = true;
    for (var i = 0; i < gamePattern.length; i++) {
      if (userClickedPattern[i] != gamePattern[i]) {
        correctPattern = false;
      }
    }
    if (correctPattern) {
      setTimeout(function() {
        nextSequence();
      }, 500);
      userClickedPattern = [];
      //nextSequence();
    } else {
      playSound('wrong');
      $('body').addClass('game-over');
      setTimeout(function() {
        $('body').removeClass('game-over');
      }, 200);
      $('h1').text('Game Over! Press Any Key to Restart ..');
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
      gameStarted = false;
    }
  }
});