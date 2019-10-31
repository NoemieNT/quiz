import Chrono from "./Chrono.js";

console.log(Chrono);

// get element by id
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImage = document.getElementById("qImage");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const bTimeForm = document.getElementById("bTimeForm");
const timeForm = document.getElementById("timeForm");
const choices = document.getElementById("choices");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");

// get element by classname
const counter = document.getElementsByClassName("counter");
const choice = document.getElementsByClassName("choice");

// Array avec les questions

// variable = lastQuestionIndex (last question of the array), runningQuestionIndex (each question ++ in the[]), questionTime (10 sec to answer an answer), formWitdh = size of the element, Count, formProgress = element getting more color everytime you get more points
// score, timer
let lastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;
const questionTime = 10; //10 sec for every question
const formWidth = 150;
let count = 0;
const formProgress = formWidth / questionTime;
let score = 0;
let timer;

// render the question
function renderQuestion() {
  let q = questions[runningQuestionIndex];
  console.log(q);

  /*qImg.innerHTML = "<img src=" + q.imgSrc + ">";*/
  q.innerHTML = "<p>" + q.question + "</p>";
  document.querySelector("#A.choice").innerHTML = q.choiceA;
  document.querySelector("#B.choice").innerHTML = q.choiceB;
  document.querySelector("#C.choice").innerHTML = q.choiceC;
}

renderQuestion();

// start quiz
start.addEventListener("click", startQuiz);

function startQuiz() {
  counterRender();
  timer = setInterval(counterRender, 1000);
  progressRender();
  questionRender();
}

function counterRender() {
  if (count <= questionTime) {
    counter.innerHTML = count;
  } else {
    count = 0;
    answerIsWrong();
    if (runningQuestionIndex < lastQuestionIndex) {
      runningQuestionIndex++;
    } else {
      clearInterval(timer);
      scoreRender();
    }
  }
}

// CHECK THE ANSWER
function checkAnswer(answer) {
  if (questions[runningQuestionIndex].correct == answer) {
    score++;
  } else {
    answerIsWrong();
  }
  // if (runningQuestionIndex < lastQuestionIndex) {
  //     count = 0;
  //     runningQuestionIndex++;
  //     questionRender();
  // } else {
  //     clearInterval(timer);
  // }
}

// // not sure to keep = if the answer is correct, green dot displayed
// function answerIsCorrect() {
//     document.getElementById(runningQuestionIndex).style.background = "green";
// }

// // not sure to keep = if the answer is wrong, red dot displayed
// function answerIsWrong() {
//     document.getElementById(runningQuestionIndex).style.background = "red";
// }

// render progress
function progressRender() {
  for (let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
    progress.innerHTML += "<div class = `prog` id= `+ qIndex + ` </div>";
  }
}

// need to ask : how to change page for the result :

// Last page to display with the score + image + <p> that matches the player score
function scoreRender() {
  let scorePerCent = Math.round((100 * score) / questions.length);
  let image =
    scorePerCent >= 80
      ? "clinking-beer-mugs.png"
      : scorePerCent >= 60
      ? "cupcake.png"
      : scorePerCent >= 40
      ? "coffee.png"
      : scorePerCent >= 20
      ? "baby-bottle.png"
      : "wax.png";

  scoreContainer.innerHTML =
    "< img src = " + img + "><p>" + scorePerCent + "% </p>";
}
