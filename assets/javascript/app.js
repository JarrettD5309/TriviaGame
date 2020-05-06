
// sets clock time
var number = 30;

var rightAnswers = 0;
var wrongAnswers = 0;
var timedOutAnswers = 0;
var phaseCounter = -1;

//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

var timeoutID;

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

var answersArr = ["Jim Abbott","Jimmy Key","Sterling Hitchcock","Scott Kamieniecki"]

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
    }

]

function run(obj,index) {
    number=30;
    $("#time-div").html("<h2>30</h2>");
    clearInterval(intervalId);
    intervalId = setInterval(function() {
        decrement(obj,index);
    }, 1000);
}

//  The decrement function.
function decrement(obj,index) {

    //  Decrease number by one.
    number--;

    //  Show the number in the #time-div tag.
    $("#time-div").html("<h2>" + number + "</h2>");


    //  Once number hits zero...
    if (number === 0) {

    //  ...run the stop function.
    stop();

    //  Alert the user that time is up.
    instructions.text("TIME'S UP! The answer was " + obj[index].correctAnswer + ".");
    answerImg.show();
    answerImg.append($("<img>",{class: "img-fluid rounded", src: obj[index].image}));
    questionDiv.hide();
    buttonGroup.hide();
    timedOutAnswers++;
    timeoutID = setTimeout(function() {
        timeoutScreen(yankeesQuestions)
    },3000);
    }
}

//  The stop function
function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}

function addAnswers(obj, index) {
    buttonGroup.show();
    answerImg.empty();
    buttonOne.text(obj[index].answers[0]);
    buttonTwo.text(obj[index].answers[1]);
    buttonThree.text(obj[index].answers[2]);
    buttonFour.text(obj[index].answers[3]);
    
}

function addQuestion(obj, index) {
    questionDiv.empty();
    questionDiv.show();
    instructions.text("Answer the question before time runs out!");
    var newPara = $("<p>");
    newPara.text(obj[index].question);
    questionDiv.append(newPara);
}

function checkAnswer(obj,index) {
    if ($(event.target).text()===obj[index].correctAnswer) {
        stop();
        instructions.text("CORRECT! The answer was " + obj[index].correctAnswer + ".");
        answerImg.show();
        answerImg.append($("<img>",{class: "img-fluid rounded", src: obj[index].image}));
        questionDiv.hide();
        buttonGroup.hide();
        rightAnswers++;
        timeoutID = setTimeout(function() {
            timeoutScreen(yankeesQuestions)
        },3000);
    } else if ($(event.target).text()!==obj[index].correctAnswer) {
        stop();
        instructions.text("WRONG! The answer was " + obj[index].correctAnswer + ".");
        answerImg.show();
        answerImg.append($("<img>",{class: "img-fluid rounded", src: obj[index].image}));
        questionDiv.hide();
        buttonGroup.hide();
        wrongAnswers++;
        timeoutID = setTimeout(function() {
            timeoutScreen(yankeesQuestions)
        },3000);
    } 
}

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

buttonGroup.hide();
startOverButton.hide();
answerImg.append($("<img>",{class: "img-fluid rounded", src: "assets/images/yankee_hat_bat.png"}));

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
  
