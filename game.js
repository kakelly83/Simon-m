
var sequence = [];
var level = 1;
var sequenceNum = 0;
var gameOver = true;
var topScore = 0;
var greenSequence = ["#ffc93c", "#07689f","#ec0101","#519872"  ];
var blueSequence = ["#ec0101", "#519872","#ffc93c","#07689f"  ];
var redSequence = ["#519872", "#ffc93c","#07689f","#ec0101"  ];
var yellowSequence = ["#07689f", "#ec0101","#519872","#ffc93c"  ];



// run the logo animation when page loads
$(window).on('load', function () {
    //start with reset button removed
    $("#reset").hide();

    //trigger logo animations
    animateLogoComponent(".blueTb", "#07689f",blueSequence );
    setTimeout(function(){
      animateLogoComponent(".yellowTb", "#ffc93c", yellowSequence);
    }, 200);
    setTimeout(function(){
      animateLogoComponent(".redTb", "#ec0101", redSequence);
    }, 400);
    setTimeout(function(){
      animateLogoComponent(".greenTb", "#519872", greenSequence);
    }, 800)
});



//animation of logo - slides in and changes colours
function animateLogoComponent(btnName, bgCol, colSequence){

  $(btnName).css("background-color", bgCol);
  slideAni(btnName);
  setTimeout(function(){
    colourAni(btnName, colSequence);
  }, 2000);


}

// slides in each button from left to right
function slideAni(component){
  var div = $(component);
  div.animate({marginLeft: "6px"}, 1000, "swing");

}

// flashes different colours for each button
function colourAni(btnName, colSeq){

  $(btnName).css("background-color", colSeq[0]);
  setTimeout(function(){
    $(btnName).css("background-color", colSeq[1]);
  }, 500);
  setTimeout(function(){
    $(btnName).css("background-color", colSeq[2]);
  }, 500);
  setTimeout(function(){
    $(btnName).css("background-color", colSeq[3]);
  }, 500);

}




//button listeners
$(".btn").click(function(){
    if(gameOver == false){
      buttonPressed(this.id);
    }
});

$(".command-btn").click(function(){
  if(this.id == "start"){
    start();
    $("#start").remove();
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
  $("#score-text").text("Current high score: Level " + topScore);
  $("#reset").hide();
  gameOver = false;
  sequence = [];
  sequenceNum = 0;
  level = 1;
  start();
}

function checkTopScore(){
  if(level > topScore)
  {
    topScore = level;
    return true;
  }else{
    return false;
  }
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

        //check if they beat top score
        if(checkTopScore()){
            $("#level-title").text("Game Over!");
            $("#score-text").text("NEW HIGH SCORE! Level " + level);
        }else{
            $("#level-title").text("Game Over!");
            $("#score-text").text("You reached Level " + level);
        }

        //show instructions on how to reset the game


        $("#reset").show();
        gameOver = true;
      }
  }
