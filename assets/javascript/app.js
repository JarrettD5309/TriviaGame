
// sets clock time
var number = 30;

//  Variable that will hold our interval ID when we execute the "run" function
var intervalId;

var instructions = $("#instructions");
var questionDiv = $("#question-div");
var buttonGroup = $(".btn-group-vertical");
var buttonOne = $("#button-1");
var buttonTwo = $("#button-2");
var buttonThree = $("#button-3");
var buttonFour = $("#button-4");
var answerImg = $("#answer-img");

var answersArr = ["Jim Abbott","Jimmy Key","Sterling Hitchcock","Scott Kamieniecki"]

var yankeesQuestions = [
    {
        question: "Which one-handed Yankees pitcher threw a no-hitter in 1993?",
        answers: ["Jim Abbott","Jimmy Key","Sterling Hitchcock","Scott Kamieniecki"],
        correctAnswer: "Jim Abbott",
        image: "assets/images/jim_abbott.jpg"
    }
]

function run(obj,index) {
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
    buttonOne.text(obj[index].answers[0]);
    buttonTwo.text(obj[index].answers[1]);
    buttonThree.text(obj[index].answers[2]);
    buttonFour.text(obj[index].answers[3]);
    
}

function addQuestion(obj, index) {
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
    } else if ($(event.target).text()!==obj[index].correctAnswer) {
        stop();
        instructions.text("WRONG! The answer was " + obj[index].correctAnswer + ".");
        answerImg.append($("<img>",{src: obj[index].image}));
        questionDiv.hide();
        buttonGroup.hide();
    } 
}

addAnswers(yankeesQuestions,0);
addQuestion(yankeesQuestions,0);
run(yankeesQuestions,0);



$(".btn").on("click", function(){
    checkAnswer(yankeesQuestions,0);
});
  
