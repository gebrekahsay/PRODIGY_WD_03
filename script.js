// app.js

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');

let isXTurn = true; // X always goes first
let gameActive = true; // To check if game is still active

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  
  if (gameActive && !cell.classList.contains('x') && !cell.classList.contains('o')) {
    cell.classList.add(currentClass);
    if (checkWin(currentClass)) {
      gameStatus.textContent = `Player ${currentClass} wins!`;
      gameActive = false;
    } else if (isDraw()) {
      gameStatus.textContent = "It's a draw!";
      gameActive = false;
    } else {
      isXTurn = !isXTurn;
      gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
    }
  }
}

// Check for a win
function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

// Check for a draw
function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

// Restart game
function restartGame() {
  isXTurn = true;
  gameActive = true;
  gameStatus.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.classList.remove('X');
    cell.classList.remove('O');
  });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
