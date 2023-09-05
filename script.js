const gameBoardEl = document.querySelector('.gameBoard')
const tileEls = document.querySelectorAll('.tile')

// module
const Gameboard = (function GameBoard() {
  const board = []
  const addMove = (move) => board.push(move)

  return { board, addMove }
})()

// factory
const Player = (name, choice) => {
  const getName = () => name
  const getChoice = () => choice
  const makeMove = () => {
    Gameboard.addMove(choice)
  }
  return { getName, getChoice, makeMove }
}

const player1 = Player('jeff', 'X')
const player2 = Player('samantha', 'O')

let invertTurn = false

const handleTileClick = (e) => {
  invertTurn ? player2.makeMove() : player1.makeMove()
  e.target.textContent = Gameboard.board[Gameboard.board.length - 1]
  invertTurn = !invertTurn
}

Array.from(tileEls).forEach((tile) =>
  tile.addEventListener('click', handleTileClick)
)
