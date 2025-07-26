const board = document.getElementById("gameBoard");
const statusText = document.getElementById("statusText");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.setAttribute("data-index", index);
    cellElement.innerText = cell;
    cellElement.addEventListener("click", handleCellClick);
    board.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  renderBoard();
  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.innerText = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.innerText = "Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `${currentPlayer}'s turn`;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.innerText = `${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
statusText.innerText = `${currentPlayer}'s turn`;
