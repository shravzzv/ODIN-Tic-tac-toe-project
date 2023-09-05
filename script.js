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

player1.makeMove()
player2.makeMove()
console.log(Gameboard)
