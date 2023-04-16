const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Displays the scores in local storage in a list //
highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name}-${score.score}</li>`;
  })
  .join("");
