const username = document.getElementById("username");
const savedScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores", JSON.stringify)) || [];

// Displays score of user //
finalScore.innerText = mostRecentScore

// Event listener for click on save button //
username.addEventListener('keyup', () => {
  
  // Save button won't be clickable until a username is typed in //
  savedScoreBtn.disabled = !username.value;
})

// Function to save high score //
saveHighScore = (e) => {

  // Prevents from opening up on a new page //
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  // Will push score onto highScore array //
  highScores.push(score);
  // Will sort array by highest to lowest score //
  highScores.sort ((a, b) => b.score - a.score)
  // Will only keep up to 5 scores //
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign('/')
}