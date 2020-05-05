
// sets clock time
var number = 30;

//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

var instructions = $("#instructions");
var questionDiv = $("#question-div");
var answersDiv = $("#answers-div");
var buttonOne = $("#button-1");
var buttonTwo = $("#button-2");
var buttonThree = $("#button-3");
var buttonFour = $("#button-4");

var answersArr = ["Jim Abbott","Jimmy Key","Sterling Hitchcock","Scott Kamieniecki"]

var yankeesQuestions = [
    {
        question: "Which one-handed Yankees pitcher threw a no-hitter in 1993?",
        answers: ["Jim Abbott","Jimmy Key","Sterling Hitchcock","Scott Kamieniecki"],
        correctAnswer: "Jim Abbott"
    }
]

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
function decrement() {

    //  Decrease number by one.
    number--;

    //  Show the number in the #show-number tag.
    $("#time-div").html("<h2>" + number + "</h2>");


    //  Once number hits zero...
    if (number === 0) {

    //  ...run the stop function.
    stop();

    //  Alert the user that time is up.
    instructions.text("TIME'S UP!");
    }
}

//  The stop function
function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}

function addAnswers(obj) {
    buttonOne.text(obj[0].answers[0]);
    buttonTwo.text(obj[0].answers[1]);
    buttonThree.text(obj[0].answers[2]);
    buttonFour.text(obj[0].answers[3]);
    
}

function addQuestion(obj) {
var newPara = $("<p>");
newPara.text(obj[0].question);
questionDiv.append(newPara);
}

addAnswers(yankeesQuestions);
addQuestion(yankeesQuestions);
run();

$(".btn").on("click", function(){
    if ($(event.target).text()===yankeesQuestions[0].correctAnswer) {
        
        instructions.text("CORRECT!");
    } else if ($(event.target).text()!==yankeesQuestions[0].correctAnswer) {
        instructions.text("WRONG!");
    }
});
  
