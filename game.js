var sequence = [];
var level = 1;
var sequenceNum = 0;
var gameOver = true;

//key listener
$(document).on("keypress", function(e){
        if(e.which == 97 || e.which == 65 ){
          // update title and start game
           start();

        }else {
          if(gameOver == true){
              reset();
          }
        }
    });

//button listeners
$(".btn").click(function(){
    if(gameOver == false){
      buttonPressed(this.id);
    }
});

$(".command-btn").click(function(){
  if(this.id == "start"){
    start();
  }else{
      reset();
  }
});

function start(){
  $("#level-title").text("Level 1");
  gameOver = false
  nextSequence();
}

// generates random number to determine next colour in sequence
function nextSequence(){
  var nextNum = Math.floor(Math.random() * 4);

  // assign appropriate colour based on number
  var colour = "";

  switch(nextNum){
    case 0: colour = "green";
            break;
    case 1: colour = "red";
            break;
    case 2: colour = "yellow";
            break;
    case 3: colour = "blue";
  }

  sequence.push(colour); // add to the sequence
  setTimeout(function(){
    playAnimation(colour); // animate the appropriate button
  }, 200);
}

// plays the animation of the next colour in sequence and appropriate sound
function playAnimation(colourToAni){
  // animate appropriate button
  $("#"+colourToAni).fadeOut();
  setTimeout(function(){
    $("#"+colourToAni).fadeIn();
  }, 5);

  // play correct sound
  audio = new Audio("sounds/"+colourToAni+".mp3");
  audio.play();
}

// resets the game by resetting all variables
function reset(){
  gameOver = false;
  sequence = [];
  sequenceNum = 0;
  level = 1;
  start();
}

function buttonPressed(btnPressed){
  // get button clicked
  var btnClicked = "#"+btnPressed;

    // add shadow effect and remove
    $(btnClicked).addClass("pressed");
    setTimeout(function(){
        $(btnClicked).removeClass("pressed");
    }, 100);

    checkUserInput(btnPressed);
  }

  //check if user is correct or incorrect
  function checkUserInput(userChoice){
      //check if correct
      if(sequence[sequenceNum] == userChoice){
        sequenceNum ++;

        // sequence complete, update levels and get next colour
        if(sequenceNum == sequence.length){
            sequenceNum = 0;
            level ++;
            $("#level-title").text("Level "+ level);
            nextSequence();
          }
      }else {
        // change background
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        // play incorrect sound
        audio = new Audio("sounds/wrong.mp3");
        audio.play();

        //show instructions on how to reset the game
        $("#level-title").text("Game Over, Press Any Key to Restart");
        gameOver = true;
      }
  }
