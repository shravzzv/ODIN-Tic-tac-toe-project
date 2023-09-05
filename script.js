// module
const game = (function () {
  const tileEls = document.querySelectorAll('.tile')

  const start = () => {
    let invertTurn = false

    const handleTileClick = (e) => {
      if (e.target.textContent !== '') return
      invertTurn ? player2.makeMove() : player1.makeMove()
      e.target.textContent = gameboard.getLastMove()
      invertTurn = !invertTurn
    }

    Array.from(tileEls).forEach((tile) =>
      tile.addEventListener('click', handleTileClick)
    )
  }

  const end = () => {}

  return { start, end }
})()

// module
const gameboard = (function GameBoard() {
  const board = []
  const addMove = (move) => board.push(move)
  const getBoardLength = () => board.length
  const getLastMove = () => board[getBoardLength() - 1]
  return { addMove, getBoardLength, getLastMove }
})()

// factory
const Player = (name, choice) => {
  const getName = () => name
  const getChoice = () => choice
  const makeMove = () => {
    gameboard.addMove(choice)
  }
  return { getName, getChoice, makeMove }
}

const player1 = Player('jeff', 'X')
const player2 = Player('samantha', 'O')

if (player1 && player2) game.start()
