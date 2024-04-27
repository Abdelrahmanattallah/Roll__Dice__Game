'use strict';
// DEFINE THE ELEMENTS BELOGNS TO PLAYER 1 (0)
const player1Section = document.querySelector('.player--0');
const player1Score = document.getElementById('score--0');
const player1Current = document.getElementById('current--0');

// DEFINE THE ELEMENTS BELOGNS TO PLAYER 2 (1)
const player2Section = document.querySelector('.player--1');
const player2Score = document.getElementById('score--1');
const player2Current = document.getElementById('current--1');

//DEFINE THE GAME 3 MAIN BUTTONS
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// DEFINE THE DICE IMG
let diceImg = document.querySelector('.dice');
diceImg.classList.add('hidden');

//DEFINE GAME MODE VARIABLE
let gameMode = false;

// GENERATE THE RANDOM DICE NUMBER AND CHECK GAME MODE FUNCTIONS
function randomDice() {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  return diceNumber;
}
function checkGameMode() {
  if (gameMode) {
    rollBtn.addEventListener('click', rollDice);
    holdBtn.addEventListener('click', holdDice);
  } else {
    rollBtn.removeEventListener('click', rollDice);
    holdBtn.removeEventListener('click', holdDice);
  }
}

// START THE GAME FUNCTIONALITY
function startGame() {
  player1Section.classList.add('player--active');
  player1Section.classList.remove('player--winner');
  player2Section.classList.remove('player--winner');
  player2Section.classList.remove('player--active');
  player1Score.textContent = 0;
  player1Current.textContent = 0;
  player2Score.textContent = 0;
  player2Current.textContent = 0;
  diceImg.classList.add('hidden');
  gameMode = true;
  checkGameMode();
}
newGameBtn.addEventListener('click', startGame);

// DEFINE A HELPER VARIABLE TO HOLD THE GENERATED DICE NUMBER
let diceNum;

// START ROLL DICE FUNCTIONALITY
function rollDice() {
  diceNum = randomDice();
  diceImg.src = `dice-${diceNum}.png`;
  diceImg.classList.remove('hidden');
  check1();
}

// START HOLD DICE FUNCTIONALITY
function holdDice() {
  const players = Array.from(document.querySelectorAll('.player'));
  const activePlayer = players.find(el =>
    el.classList.contains('player--active')
  );
  const activePlayerScore = document.querySelector(
    `#score--${activePlayer.dataset.target}`
  );
  const activePlayerCurrent = document.querySelector(
    `#current--${activePlayer.dataset.target}`
  );
  // ACTIONS DEPENDS ON PRESSING THE HOLD BTN
  players.forEach(el => el.classList.toggle('player--active'));
  activePlayerScore.textContent =
    Number(activePlayerCurrent.textContent) +
    Number(activePlayerScore.textContent);
  activePlayerCurrent.textContent = Number(0);
  if (
    activePlayerCurrent.textContent >= 100 ||
    activePlayerScore.textContent >= 100
  ) {
    activePlayer.classList.add('player--winner');
    gameMode = false;
    diceImg.classList.add('hidden');
    checkGameMode();
  }
}
holdBtn.addEventListener('click', holdDice);

// START CONDITIONS FUNCTIONALITY
function check1() {
  const players = Array.from(document.querySelectorAll('.player'));
  const activePlayer = players.find(el =>
    el.classList.contains('player--active')
  );
  const activePlayerScore = document.querySelector(
    `#score--${activePlayer.dataset.target}`
  );
  const activePlayerCurrent = document.querySelector(
    `#current--${activePlayer.dataset.target}`
  );
  activePlayerCurrent.textContent =
    Number(activePlayerCurrent.textContent) + Number(diceNum);
  if (diceNum === 1) {
    players.forEach(el => el.classList.toggle('player--active'));
    activePlayerCurrent.textContent = Number(0);
  }
  if (
    activePlayerCurrent.textContent >= 100 ||
    activePlayerScore.textContent >= 100
  ) {
    activePlayer.classList.add('player--winner');
    gameMode = false;
    diceImg.classList.add('hidden');
    checkGameMode();
  }
}

function checkTheDice() {}
