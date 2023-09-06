// module
const game = (function () {
  const _tileEls = document.querySelectorAll('.tile')

  const start = () => {
    let _invertTurn = false

    const _handleTileClick = (e) => {
      if (e.target.textContent !== '') return
      _invertTurn ? player2.makeMove() : player1.makeMove()
      e.target.textContent = gameboard.getLastMove()
      _invertTurn = !_invertTurn
    }

    Array.from(_tileEls).forEach((tile) =>
      tile.addEventListener('click', _handleTileClick)
    )
  }

  const end = () => {}

  return { start, end }
})()

// module
const gameboard = (function GameBoard() {
  const _board = []
  const addMove = (move) => _board.push(move)
  const getBoardLength = () => _board.length
  const getLastMove = () => _board[getBoardLength() - 1]
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
