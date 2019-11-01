import questions from "./questions.js";
import Chronometer from "./Chrono.js";

// DOM VARS
const mainContainer = document.getElementById("main_container");

// GAME VARS
var roundsLimit = questions.length - 1;
var roundTimeLimit = 4;
var currentQuestion = 0;
var score = 0;
var result = 0;

function resetMainContainer() {
  mainContainer.innerHTML = "";
}

function loadTemplate(tplName, clbk) {
  axios.get(`template/${tplName}.html`).then(tpl => {
    mainContainer.innerHTML += tpl.data;
    clbk();
  });
}

function setupHome() {
  const btnStart = document.getElementById("start");
  console.log(btnStart);
  btnStart.onclick = function() {
    resetMainContainer();
    loadTemplate("question", launchQuizz);
  };
}

function launchQuizz() {
  currentQuestion = 0;
  score = 0;
  loadTemplate("chrono", function() {
    displayQuestion(currentQuestion);
  });
}

function displayResults() {
  finalScore.innerHTML += `<h3>Your score is ${score}</h3>`;
  const sentences = {
    0: "Wax on, wax off NOOB",
    1: "Wax on, wax off NOOB",
    2: "Wax on, wax off NOOB",
    3: "Almost there, Baby-IronHacker!",
    4: "Almost there, Baby-IronHacker!",
    5: "Welcome Home WebDev ! ",
    6: "Welcome Home WebDev ! ",
    7: " YEAH, Welcome to you Ironhacker!",
    8: " YEAH, Welcome to you IronHacker!",
    9: " Congratulations ! Biggest IRONHACKER Ever ! ",
    10: "Congratulations ! Biggest IRONHACKER Ever !"
  };
  // scoreSentences.innerHTML = sentences;

  // console.log(sentences[score]);
  scoreSentences.innerHTML += `<p>${sentences[score]}</p>`;
}

// question and radio btn (from doc "question")
function displayQuestion(index) {
  if (index <= roundsLimit) {
    const target = document.getElementById("question");
    const question = target.querySelector("#text");
    const text1 = target.querySelector("#A .text");
    const text2 = target.querySelector("#B .text");
    const text3 = target.querySelector("#C .text");
    const input1 = target.querySelector("#A .radio");
    const input2 = target.querySelector("#B .radio");
    const input3 = target.querySelector("#C .radio");

    question.textContent = questions[index].question;

    text1.textContent = questions[index].choiceA;
    input1.value = "A";
    input1.checked = false;

    text2.textContent = questions[index].choiceB;
    input2.value = "B";
    input2.checked = false;

    text3.textContent = questions[index].choiceC;
    input3.value = "C";
    input3.checked = false;

    listenAnswer([input1, input2, input3], questions[index].correct);

    launchChronometer();
  } else endGame();
}

// adding answers to the score var
function listenAnswer(inputs, answer) {
  inputs.forEach(input => {
    input.oninput = function() {
      if (answer === input.value) {
        score++;
      }
    };
  });
}

// function resetChronometer() {}

function launchChronometer() {
  const timer = document.getElementById("timer");
  const counter = timer.querySelector("#counter");
  const progress = timer.querySelector("#update");
  const chrono = new Chronometer();

  //gauge

  progress.style.width = `0%`;

  function progressRender(percent) {
    progress.style.transition = `width 1s linear`;
    progress.style.width = percent + "%";
    if (percent === 100) {
      const to = setTimeout(() => {
        progress.style.transition = `none`;
        clearTimeout(to);
      }, 1000);
    }
    console.log(percent);
  }
  // gauge and timer, passing to the next question
  chrono.startClick(function getCurrentTime(time) {
    counter.textContent = time;
    progressRender((time * 100) / roundTimeLimit);

    if (time === roundTimeLimit) {
      chrono.resetClick();
      let to = setTimeout(function resetChronometer() {
        currentQuestion++;
        displayQuestion(currentQuestion);
        clearTimeout(to);
      }, 1100);
    }
  });
}

// End of the game (reset container, page result with the score)
function endGame() {
  resetMainContainer();
  loadTemplate("result", displayResults);
}

// loading the template, back to homepage
loadTemplate("home", setupHome);
