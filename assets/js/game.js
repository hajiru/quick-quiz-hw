const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");
const countdown = document.getElementById("timerCount");

// Variables to hold and find questions //
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer = 0;
let timerCount = 60;
let interval = setInterval(startTime, 1000);

// Questions held as objects //
let questions = [
  {
    question: "How many seasons of pokemon is there?",
    choice1: "20",
    choice2: "22",
    choice3: "23",
    choice4: "25",
    answer: 4
  },
  {
    question: "What pokemon is pokedex entry number 0025?",
    choice1: "Pikachu",
    choice2: "Charmander",
    choice3: "Squirtle",
    choice4: "Bulbasaur",
    answer: 1
  },
  {
    question: "What is the latest pokemon game?",
    choice1: "Pokemon Ruby & Sapphire",
    choice2: "Pokemon Black & White",
    choice3: "Pokemon Scarlet & Violet",
    choice4: "Pokemon Shield & Sword",
    answer: 3
  },
  {
    question: "What is my favorite pokemon? (Hint: It's a ghost type.)",
    choice1: "Typhlosion",
    choice2: "Dragapult",
    choice3: "Charizard",
    choice4: "Garchomp",
    answer: 2
  },
  {
    question: "Who is the main character of Pokemon?",
    choice1: "Ash",
    choice2: "Gloria",
    choice3: "Professor Oak",
    choice4: "None of the above",
    answer: 1
  }
];

const correct_bonus = 5;
const max_questions = 5;

// Function to start quiz //
startGame = () => {
  timerCount = 60;
  questionCounter = 0;
  score = 0;

  // Three dots is a spread operator that takes the array and spreads it out //
  availableQuestions = [...questions]

  // Calls getNewQuestion function to get new questions //
  getNewQuestion();
};

// Function to stop timer to go negative //
function startTime() {
  timer++;
  countdown.innerHTML = convertSeconds(timerCount - timer);

  if (timer == timerCount) {
    clearInterval(interval);
  };
};

// Function to get a random new question from question array //
getNewQuestion = () => {

  // Will bring user to score screen when there are no more questions //
  if(availableQuestions.length === 0 || questionCounter >= max_questions){
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('end.html');
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // Populates choices and makes sure that the correct choice is the correct one //
  choices.forEach(choice => {

    // Takes from the data number we had set in the game html file //
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  // Will get rid of used question //
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

// Listens for clicks on answers //
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // Will apply appropriate classes to the user's choice //
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    // Adds up the score if the answer is correct //
    if (classToApply === "correct") {
      incrementScore(correct_bonus);
    }

    if (classToApply == "incorrect") {
      timerCount -= 5;
    }

    // Will apply colored background from game css to show visually if correct or incorrect //
    selectedChoice.parentElement.classList.add(classToApply);

    // Function to remove applied class then get new question //
    setTimeout( () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

  });
});

function convertSeconds(s) {
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return minutes + ":" + seconds;
};

// Display score of user //
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// Calls startGame function //
startGame();