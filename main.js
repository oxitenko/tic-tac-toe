import './style.css'

const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];
const human = "O";
const robot = "X";
let board;
const squares = document.querySelectorAll(".board_item");
const button = document.querySelector(".button");
const winnerBlock = document.querySelector(".winner");
const winnerMessage = document.querySelector(".winner_message");
startGame();

button.addEventListener("click", startGame);

function startGame() {
    board = Array.from(Array(9).keys());
    for (let i = 0; i < squares.length; i++) {
        squares[i].innerHTML = "";
        squares[i].style.removeProperty("background-color");
        squares[i].addEventListener("click", turnClick, false);
        winnerBlock.style.display = "none";
        winnerMessage.textContent = "";
    }
}
function turnClick(square) {
    if (typeof board[square.target.id] === "number") {
        turn(square.target.id, human)
        if (!checkTie()) turn(bestSpot(), robot);
    }
}
function turn(id, player) {
    board[id] = player;
    document.getElementById(id).textContent = player;
    let gameWon = checkWinner(board, player)
    if (gameWon) gameOver(gameWon)
}

function checkWinner(board, player) {
    let plays = board.reduce((acc, item, index) => (item === player) ? acc.concat(index) : acc, []);
    let gameWon = null;
    for (let [index, win] of winCombo.entries()) {
        if (win.every(item => plays.indexOf(item) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombo[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player === human ? "#CDF0EA" : "#FECACA"
    }
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener("click", turnClick, false);
    }
    declareWinner(gameWon.player === human ? "You win!" : "You lose!");
}
function bestSpot() {
    return emptySquares()[0];
}
function emptySquares() {
    return board.filter(item => typeof item === "number");
}

function declareWinner(winner) {
    winnerBlock.style.display = "flex";
    winnerMessage.textContent = winner;
}
function checkTie() {
    if (emptySquares().length === 0) {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = "#D9F99D";
            squares[i].removeEventListener("click", turnClick, false);
        }
        declareWinner("Oops!")
        return true;
    }
    return false;
}