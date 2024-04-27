"use strict";

//Holding The Player 1 Variables
const firstPlayer = document.querySelector(".player--0");
const firstPlayerName = document.getElementById("name--0");
const firstPlayerScore = document.getElementById("score--0");
const firstPlayercurrent = document.getElementById("current--0");
const firstPlayerDataTarget = +firstPlayer.dataset.target;

//Holding The Player 2 Variables
const secondPlayer = document.querySelector(".player--1");
const secondPlayerName = document.getElementById("name--1");
const secondPlayerScore = document.getElementById("score--1");
const secondPlayercurrent = document.getElementById("current--1");
const secondPlayerDataTarget = +firstPlayer.dataset.target;

//Holding The Buttons
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

//Collecting The Two Players In One Variable
const players = document.querySelectorAll(".player");
const playersScore = document.querySelectorAll(".score");
const playersCurrent = document.querySelectorAll(".current-score");

//Holding The Dice Img
let diceImg = document.querySelector(".dice");

//**********************************Todo Start Game Logic**********************************

//Define The Game Mode
let gameMode = false;
function checkGameMode() {
  if (gameMode) {
    rollDiceBtn.addEventListener("click", rollDice);
    holdBtn.addEventListener("click", holdUp);
  } else {
    rollDiceBtn.removeEventListener("click", rollDice);
    holdBtn.removeEventListener("click", holdUp);
  }
}
checkGameMode();

//First Step Generate A Random Number From (1 => 6)
const generatedNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};
let generatedHolder;
// Start Function NewGame
function newGame() {
  gameMode = true;
  diceImg.classList.remove("hidden");
  players.forEach((player) => {
    player.classList.remove("player--winner");
    player.classList.remove("player--active");
  });
  firstPlayer.classList.add("player--active");
  playersScore.forEach((score) => (score.textContent = 0));
  playersCurrent.forEach((current) => (current.textContent = 0));
  diceImg.src = `dice-1.png`;
  checkGameMode();
}
newGameBtn.addEventListener("click", newGame);

//Holding The Active Player Variables
let activePlayer;
let activePlayerData;
let activePlayerScore;
let activePlayerCurrent;

//Holding The Active Player And Rendering The Score
function whoIsActive() {
  activePlayer = document.querySelector(".player--active");
  activePlayerData = activePlayer.dataset.target;
  activePlayerScore = document.getElementById(`score--${activePlayerData}`);
  activePlayerCurrent = document.getElementById(`current--${activePlayerData}`);
  whoIsWinner();
}

//Roll Dice Functionality
function rollDice() {
  //Define A Holder To Catch The Same Number And To Avoid BUG
  generatedHolder = generatedNumber();
  diceImg.src = `dice-${generatedHolder}.png`;
  whoIsActive();
  activePlayerCurrent.textContent =
    generatedHolder + +activePlayerCurrent.textContent;
  checkTheDice();
  whoIsWinner();
  checkGameMode();
}

//Check If The Number Is (1)
function checkTheDice() {
  if (generatedHolder === 1) {
    players.forEach((player) => {
      player.classList.toggle("player--active");
    });
    playersCurrent.forEach((current) => (current.textContent = 0));
  } else {
    false;
  }
}
//Adding The Values From The Current To The Score (hold Key)
function holdUp() {
  activePlayerScore.textContent =
    +activePlayerCurrent.textContent + +activePlayerScore.textContent;
  activePlayerCurrent.textContent = 0;
  players.forEach((player) => {
    player.classList.toggle("player--active");
  });
  checkGameMode();
  whoIsWinner();
}

//Who IS Winner
function whoIsWinner() {
  if (+activePlayerScore.textContent >= 100) {
    activePlayer.classList.add("player--winner");
    players.forEach((player) => player.classList.remove("player--active"));
    diceImg.classList.add("hidden");
    gameMode = false;
    checkGameMode();
  } else {
    false;
  }
}
