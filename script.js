'use strict';

//selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
//starting conditions

let scores, currentScore, activePlayer, playing;

const init = () => {
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;


    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;


    diceEl.classList.add('hidden');
    player1.classList.remove('player--winner')
    player2.classList.remove('player--winner')
    diceEl.classList.add('hidden');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
}
init();


//Swithing the players

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

//adding dice roll functionality

btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${dice}.png`;
        diceEl.classList.remove('hidden');
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

// for the holding button

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] < 100) {
            switchPlayer();
        } else if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            // document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer + 1} Wins 🏆`;
            // document.getElementById(`name--${activePlayer === 1 ? 0 : 1}`).textContent = `Player ${activePlayer === 1 ? 1 : 2} Loose 😭`;
        }
    }
})

// Resetting the game

btnNew.addEventListener('click', init);