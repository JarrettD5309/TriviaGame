
// sets clock time
var number = 30;

var rightAnswers = 0;
var wrongAnswers = 0;
var timedOutAnswers = 0;
var phaseCounter = -1;

//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

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
    answerImg.append($("<img>",{src: obj[index].image}));
    questionDiv.hide();
    buttonGroup.hide();
    timedOutAnswers++;
    setTimeout(function() {
        phaseCounter++;
        addAnswers(yankeesQuestions,phaseCounter);
        addQuestion(yankeesQuestions,phaseCounter);
        run(yankeesQuestions,phaseCounter);
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
        answerImg.append($("<img>",{src: obj[index].image}));
        questionDiv.hide();
        buttonGroup.hide();
        rightAnswers++;
        setTimeout(function() {
            phaseCounter++;
            addAnswers(yankeesQuestions,phaseCounter);
            addQuestion(yankeesQuestions,phaseCounter);
            run(yankeesQuestions,phaseCounter);
        },3000);
    } else if ($(event.target).text()!==obj[index].correctAnswer) {
        stop();
        instructions.text("WRONG! The answer was " + obj[index].correctAnswer + ".");
        answerImg.append($("<img>",{src: obj[index].image}));
        questionDiv.hide();
        buttonGroup.hide();
        wrongAnswers++;
        
        setTimeout(function() {
            phaseCounter++;
            addAnswers(yankeesQuestions,phaseCounter);
            addQuestion(yankeesQuestions,phaseCounter);
            run(yankeesQuestions,phaseCounter);
        },3000);
    } 
}



buttonGroup.hide();
startOverButton.hide();

$(".btn").on("click", function(){
    if (phaseCounter===-1) {
        startButtonGroup.hide();
        addAnswers(yankeesQuestions,0);
        addQuestion(yankeesQuestions,0);
        run(yankeesQuestions,0);
        phaseCounter++;
    } else if (phaseCounter>=0) {
    checkAnswer(yankeesQuestions,phaseCounter);
    }
});
  
