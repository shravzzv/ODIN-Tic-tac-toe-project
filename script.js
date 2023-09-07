// module
const game = (function () {
  const startEl = document.querySelector('.start-game')
  const pauseEl = document.querySelector('.pause-game')
  const resetEl = document.querySelector('.reset-game')
  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => e.preventDefault())

  const start = () => {
    gameboard.activate()
    gameboard.checkResult()
  }
  const end = () => gameboard.deactivate()
  const reset = () => gameboard.reset()

  startEl.addEventListener('click', start)
  pauseEl.addEventListener('click', end)
  resetEl.addEventListener('click', reset)

  return {}
})()

// module
const gameboard = (function GameBoard() {
  const _tileElsArr = Array.from(document.querySelectorAll('.tile'))
  const _board = ['', '', '', '', '', '', '', '', '']
  let _invertTurn = false
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

  const _handleTileClick = (e) => {
    if (e.currentTarget.textContent !== '') return
    _invertTurn
      ? player2.makeMove(_tileElsArr.indexOf(e.currentTarget))
      : player1.makeMove(_tileElsArr.indexOf(e.currentTarget))
    _invertTurn = !_invertTurn
  }

  const activate = () => {
    _tileElsArr.forEach((tile) =>
      tile.addEventListener('click', _handleTileClick)
    )
  }

  const deactivate = () => {
    _tileElsArr.forEach((tile) => {
      tile.removeEventListener('click', _handleTileClick)
    })
  }

  const populate = () => {
    _tileElsArr.forEach((tile, i) => (tile.textContent = _board[i]))
  }

  const update = (move, index) => {
    _board.splice(index, 1, move)
    populate()
  }

  const reset = () => {
    _board.splice(0, 9, '', '', '', '', '', '', '', '', '')
    populate()
    _invertTurn = false
  }

  const checkResult = () => {
    for (const combination of _winningCombinations) {
      const [a, b, c] = combination
      if (
        _board[a] === _board[b] &&
        _board[a] === _board[c] &&
        _board[b] === _board[c] &&
        !_board.includes('')
      ) {
        console.log('check win')
      }
    }
  }

  return {
    update,
    populate,
    activate,
    deactivate,
    reset,
    checkResult,
  }
})()

// factory
const Player = (name, choice) => {
  const getName = () => name
  const getChoice = () => choice
  const makeMove = (index) => {
    gameboard.update(choice, index)
  }
  return { getName, getChoice, makeMove }
}

const player1 = Player('jeff', 'X')
const player2 = Player('samantha', 'O')
