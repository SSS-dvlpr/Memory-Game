// JavaScript (script.js)

const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const scoreboard = document.getElementById('scoreboard');
const scoresList = document.getElementById('scores');

const symbols = ['😀', '😎', '😍', '😜', '🤪', '😇', '🤠', '🥳', '🚀', '🌈', '🍕', '🎉', '🎸', '🐱', '🌼', '🏆', '🎩', '🌟', '🍔', '🎲'];

let cards = [];
let selectedCards = [];
let matches = 0;
let moves = 0;
let timeLeft = 60;
let timerInterval;
let isGameActive = false;

// Shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Flip a card
function flipCard(card) {
    if (!isGameActive || card.classList.contains('matched') || card.classList.contains('selected') || card.classList.contains('attempted') || selectedCards.length >= 2) {
        return;
    }

    card.classList.add('selected');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// Check if selected cards match
function checkMatch() {
    const [card1, card2] = selectedCards;
    moves++;

    if (card1.textContent === card2.textContent) {
        card1.classList.remove('selected');
        card2.classList.remove('selected');
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
    } else {
        card1.classList.add('attempted'); // Mark the attempted cards
        card2.classList.add('attempted');
    }

    if (matches === symbols.length) {
        endGame();
    }

    selectedCards = [];
    updateScore();
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = `Moves: ${moves}`;
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// End the game
function endGame() {
    if (!isGameActive) return; // Ensure endGame is called only once
    isGameActive = false;
    clearInterval(timerInterval);
    timerDisplay.style.display = 'none';
    if (matches === symbols.length) {
        scoreDisplay.textContent = `Congratulations! You completed the game in ${moves} moves.`;
        displayScoreboard();
    } else {
        scoreDisplay.textContent = `Time's up! You ran out of time.`;
    }
}

// Display the scoreboard
function displayScoreboard() {
    scoreboard.style.display = 'block';
    const scoreItem = document.createElement('li');
    scoreItem.textContent = `Moves: ${moves}, Time left: ${timeLeft}`;
    scoresList.appendChild(scoreItem);
}

// Event listener for start button
startButton.addEventListener('click', createGameBoard);

// Create a new game board
function createGameBoard() {
    gameBoard.innerHTML = '';
    cards = [];
    matches = 0;
    moves = 0;
    timeLeft = 60;
    scoreDisplay.textContent = '';
    isGameActive = true;
    scoreboard.style.display = 'none';
    timerDisplay.style.display = 'block';

    const shuffledSymbols = symbols.concat(symbols);
    shuffle(shuffledSymbols);

    shuffledSymbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = symbol;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
        cards.push(card);
    });

    startTimer();
}

// Initialize the game board
createGameBoard();
