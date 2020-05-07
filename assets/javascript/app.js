
//clock time variable
var number = 15;

// answer vars and var to keep track of phase
var rightAnswers = 0;
var wrongAnswers = 0;
var timedOutAnswers = 0;
var phaseCounter = -1;

//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

// enables ability to clear timeout to fix reset issue
var timeoutID;

// jQuery tag variables
var instructions = $("#instructions");
var questionDiv = $("#question-div");
var buttonGroup = $(".btn-group-vertical");
var buttonOne = $("#button-1");
var buttonTwo = $("#button-2");
var buttonThree = $("#button-3");
var buttonFour = $("#button-4");
var startButton = $("#start-button");
var startOverButton = $("#start-over-button");
var startButtonGroup = $(".btn-group");
var answerImg = $("#answer-img");

// Main object
var yankeesQuestions = [
    {
        question: "Which one-handed Yankees pitcher threw a no-hitter in 1993?",
        answers: ["Jim Abbott","Jimmy Key","Sterling Hitchcock","Scott Kamieniecki"],
        correctAnswer: "Jim Abbott",
        image: "assets/images/jim_abbott.jpg"
    },
    {
        question: "How many World Series Championships have the Yankees won?",
        answers: ["30","16","27","32"],
        correctAnswer: "27",
        image: "assets/images/27_champs.jpg"
    },
    {
        question: "Which player holds the record for career hits as a Yankee?",
        answers: ["Babe Ruth","Derek Jeter","Mickey Mantle","Bernie Williams"],
        correctAnswer: "Derek Jeter",
        image: "assets/images/derek_jeter.jpg"
    },
    {
        question: "Before taking the name 'Yankees' in 1913, what was the NY baseball organization called?",
        answers: ["White Stockings","Highlanders","Athletics","Bees"],
        correctAnswer: "Highlanders",
        image: "assets/images/highlanders.jpg"
    },
    {
        question: "Which Yankee team had the most wins in a season?",
        answers: ["1978","1961","1927","1998"],
        correctAnswer: "1998",
        image: "assets/images/1998_yankees.jpg"
    },
    {
        question: "Which player hit the first home at the original Yankee Stadium?",
        answers: ["Babe Ruth","Lou Gehrig","Wally Pip","Bob Meusel"],
        correctAnswer: "Babe Ruth",
        image: "assets/images/babe_ruth.jpg"
    },
    {
        question: "Which pitcher holds the record for career wins as a Yankee?",
        answers: ["Andy Pettitte","Lefty Gomez","Mel Stottlemyre","Whitey Ford"],
        correctAnswer: "Whitey Ford",
        image: "assets/images/whitey_ford.jpg"
    },
    {
        question: "Which Yankee pitcher did NOT throw a perfect game?",
        answers: ["David Cone","Dave Righetti","Don Larsen","David Wells"],
        correctAnswer: "Dave Righetti",
        image: "assets/images/perfect_game_balls.jpg"
    },
    {
        question: "Yankee Joe DiMaggio holds the hitting streak record. How many consecutive games was it?",
        answers: ["45","51","56","49"],
        correctAnswer: "56",
        image: "assets/images/joe_dimaggio.jpg"
    },
    {
        question: "Who was the first African-American player on a Yankees roster?",
        answers: ["Elston Howard","Roy White","Al Downing","Horace Clark"],
        correctAnswer: "Elston Howard",
        image: "assets/images/elston_howard.jpg"
    }

]

// runs the timer
function run(obj,index) {
    number=15;
    $("#time-div").html("<h2>15</h2>");
    clearInterval(intervalId);
    intervalId = setInterval(function() {
        decrement(obj,index);
    }, 1000);
}

//  The decrement function.
function decrement(obj,index) {
    number--;
    $("#time-div").html("<h2>" + number + "</h2>");
    if (number === 0) {
        instructions.text("TIME'S UP! The answer was " + obj[index].correctAnswer + ".");
        timedOutAnswers++;
        answerScreen(obj,index);
    }
}

//  The stop function
function stop() {
    clearInterval(intervalId);
}

// universal code for answer/timeout screen regardless if correct,incorrect or timed out
function answerScreen(obj, index) {
    stop();
    answerImg.show();
    answerImg.append($("<img>",{class: "img-fluid rounded", src: obj[index].image}));
    questionDiv.hide();
    buttonGroup.hide();
    timeoutID = setTimeout(function() {
        timeoutScreen(obj);
    },2500);

}

// Adds new answers to the html buttons
function addAnswers(obj, index) {
    buttonGroup.show();
    answerImg.empty();
    buttonOne.text(obj[index].answers[0]);
    buttonTwo.text(obj[index].answers[1]);
    buttonThree.text(obj[index].answers[2]);
    buttonFour.text(obj[index].answers[3]);
    
}

// Adds the questions to the html
function addQuestion(obj, index) {
    questionDiv.empty();
    questionDiv.show();
    instructions.text("Answer the question before time runs out!");
    var newPara = $("<p>");
    newPara.text(obj[index].question);
    questionDiv.append(newPara);
}

// Checks if the button clicked was right or wrong
function checkAnswer(obj,index) {
    if ($(event.target).text()===obj[index].correctAnswer) {
        instructions.text("CORRECT! The answer was " + obj[index].correctAnswer + ".");
        rightAnswers++;
        answerScreen(obj,index);
    } else if ($(event.target).text()!==obj[index].correctAnswer) {
        instructions.text("WRONG! The answer was " + obj[index].correctAnswer + ".");
        wrongAnswers++;
        answerScreen(obj,index);
    } 
}

// Checks if it is the end game step or if new question should be posted
function timeoutScreen(obj) {
    if(phaseCounter===obj.length-1) {
        answerImg.hide();
        questionDiv.empty();
        questionDiv.show();
        instructions.text("Game Over!");
        questionDiv.html("<p>correct answers: " + rightAnswers + "<br>wrong answers: " + wrongAnswers + "<br>unanswered: " + timedOutAnswers + "</p>");
        startButton.hide();
        startOverButton.show();
        
    } else {
        phaseCounter++;
        addAnswers(obj,phaseCounter);
        addQuestion(obj,phaseCounter);
        run(obj,phaseCounter);
    }
}


// Game play section

// Start screen setup
buttonGroup.hide();
startOverButton.hide();
answerImg.append($("<img>",{class: "img-fluid rounded", src: "assets/images/yankee_hat_bat.png"}));

// On click to check if START button or game play
$(".btn").on("click", function(){
    if (phaseCounter===-1) {
        startOverButton.hide();
        startButton.hide();
        addAnswers(yankeesQuestions,0);
        addQuestion(yankeesQuestions,0);
        run(yankeesQuestions,0);
        phaseCounter++;
    }  else if (phaseCounter>=0) {
    checkAnswer(yankeesQuestions,phaseCounter);
    }
});

// on click to reset game
startOverButton.on("click", function(){
    clearTimeout(timeoutID);
    rightAnswers = 0;
    wrongAnswers = 0;
    timedOutAnswers = 0;
    phaseCounter = 0;
    startOverButton.hide();
    addAnswers(yankeesQuestions,0);
    addQuestion(yankeesQuestions,0);
    run(yankeesQuestions,0);
});
  
