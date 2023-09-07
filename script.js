// module
const game = (function () {
  const restarEl = document.querySelector('.restart')
  restarEl.addEventListener('click', (e) => replay())

  const start = () => gameboard.activate()
  const end = () => gameboard.deactivate()
  const replay = () => {
    gameboard.reset()
    start()
  }

  return { start, end, replay }
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
    _checkResult()
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

  const _populate = () => {
    _tileElsArr.forEach((tile, i) => (tile.textContent = _board[i]))
  }

  const update = (choice, index) => {
    _board.splice(index, 1, choice)
    _populate()
  }

  const reset = () => {
    _board.splice(0, 9, '', '', '', '', '', '', '', '', '')
    _populate()
    _invertTurn = false
  }

  const _checkResult = () => {
    for (const combination of _winningCombinations) {
      const [a, b, c] = combination
      if (_board[a] === '❌' && _board[b] === '❌' && _board[c] === '❌') {
        setTimeout(() => {
          alert('X won!')
          game.end()
        }, 100)
        return
      }
      if (_board[a] === '⭕' && _board[b] === '⭕' && _board[c] === '⭕') {
        setTimeout(() => {
          alert('O won!')
          game.end()
        }, 100)
        return
      }
    }

    if (!_board.includes('')) {
      setTimeout(() => {
        alert("It's a draw")
        game.end()
      }, 100)
    }
  }

  return {
    update,
    activate,
    deactivate,
    reset,
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

const player1 = Player('jeff', '❌')
const player2 = Player('samantha', '⭕')

game.start()
