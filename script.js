// module
const game = (function () {
  const _tileElsArr = Array.from(document.querySelectorAll('.tile'))

  const start = () => {
    gameboard.populateBoard(_tileElsArr)
    let _invertTurn = false

    const _handleTileClick = (e) => {
      if (e.currentTarget.textContent !== '') return
      _invertTurn
        ? player2.makeMove(_tileElsArr.indexOf(e.currentTarget))
        : player1.makeMove(_tileElsArr.indexOf(e.currentTarget))
      gameboard.populateBoard(_tileElsArr)
      _invertTurn = !_invertTurn
    }

    _tileElsArr.forEach((tile) =>
      tile.addEventListener('click', _handleTileClick)
    )
  }

  const end = () => {
    const result = gameboard.checkEndGame()
    if (result === 'X' || result === 'O') {
      // Display a message for the winner
    } else if (result === 'draw') {
      // Display a message for a draw
    }
    // Remove event listeners here if the game is over
  }

  return { start, end }
})()

// module
const gameboard = (function GameBoard() {
  const _board = ['', '', '', '', '', '', '', '', '']
  const _winningCombinations = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagnols
    [0, 4, 8],
    [2, 4, 6],
  ]

  const checkEndGame = () => {
    for (const combination of _winningCombinations) {
      let [a, b, c] = combination
      if (_board[a] === 'X' && _board[b] === 'X' && _board[c] === 'X') {
        console.log('X is the winner')
      }
    }
  }

  const populateBoard = (tiles) => {
    tiles.forEach((tile, i) => (tile.textContent = _board[i]))
  }

  const updateBoard = (move, index) => {
    _board.splice(index, 1, move)
    console.log(_board)
  }

  const getItem = (index) => _board[index]

  return { updateBoard, checkEndGame, populateBoard, getItem }
})()

// factory
const Player = (name, choice) => {
  const getName = () => name
  const getChoice = () => choice
  const makeMove = (index) => {
    gameboard.updateBoard(choice, index)
  }
  return { getName, getChoice, makeMove }
}

const player1 = Player('jeff', 'X')
const player2 = Player('samantha', 'O')

game.start()
