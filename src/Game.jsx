import { useState } from 'react'
import {
  GAME_STATUS,
  generateBoard,
  revealCell,
  toggleFlag,
  revealAllMines,
  countFlags,
  checkWin,
} from './gameLogic'
import Board from './components/Board'

const DEFAULT_ROWS = 9
const DEFAULT_COLS = 9
const DEFAULT_MINES = 10

function Game() {
  const [rows] = useState(DEFAULT_ROWS)
  const [cols] = useState(DEFAULT_COLS)
  const [mineCount] = useState(DEFAULT_MINES)
  const [board, setBoard] = useState(() => generateBoard(DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_MINES))
  const [status, setStatus] = useState(GAME_STATUS.PLAYING)

  const flagsUsed = countFlags(board)
  const minesRemaining = mineCount - flagsUsed

  const handleReset = () => {
    setBoard(generateBoard(rows, cols, mineCount))
    setStatus(GAME_STATUS.PLAYING)
  }

  const handleCellClick = (row, col) => {
    if (status !== GAME_STATUS.PLAYING) return

    const cell = board[row][col]
    if (cell.isRevealed || cell.isFlagged) return

    let updatedBoard = revealCell(board, row, col)
    const clicked = updatedBoard[row][col]

    if (clicked.isMine) {
      updatedBoard = revealAllMines(updatedBoard)
      setBoard(updatedBoard)
      setStatus(GAME_STATUS.LOST)
      return
    }

    if (checkWin(updatedBoard, mineCount)) {
      setBoard(updatedBoard)
      setStatus(GAME_STATUS.WON)
      return
    }

    setBoard(updatedBoard)
  }

  const handleCellRightClick = (event, row, col) => {
    event.preventDefault()
    if (status !== GAME_STATUS.PLAYING) return

    const cell = board[row][col]
    if (cell.isRevealed) return

    const updatedBoard = toggleFlag(board, row, col)
    setBoard(updatedBoard)
  }

  let statusText = 'Playing'
  if (status === GAME_STATUS.WON) {
    statusText = 'You win!'
  } else if (status === GAME_STATUS.LOST) {
    statusText = 'Boom! You hit a mine.'
  }

  return (
    <div className="game">
      <div className="status-bar">
        <div className="status-item">Mines: {mineCount}</div>
        <div className="status-item">Flags: {flagsUsed}</div>
        <div className="status-item">Remaining: {minesRemaining}</div>
        <div className="status-item">Status: {statusText}</div>
        <button type="button" className="reset-button" onClick={handleReset}>
          New Game
        </button>
      </div>
      <Board
        board={board}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
        disabled={status !== GAME_STATUS.PLAYING}
      />
    </div>
  )
}

export default Game
