// Core Minesweeper game logic (pure functions)

export const GAME_STATUS = {
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
}

export function createEmptyBoard(rows, cols) {
  const board = []
  for (let r = 0; r < rows; r += 1) {
    const row = []
    for (let c = 0; c < cols; c += 1) {
      row.push({
        row: r,
        col: c,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      })
    }
    board.push(row)
  }
  return board
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

export function generateBoard(rows, cols, mines) {
  const board = createEmptyBoard(rows, cols)
  let placed = 0

  while (placed < mines) {
    const r = getRandomInt(rows)
    const c = getRandomInt(cols)
    const cell = board[r][c]
    if (!cell.isMine) {
      cell.isMine = true
      placed += 1
    }
  }

  // Compute adjacency counts
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (!board[r][c].isMine) {
        board[r][c].adjacentMines = countNeighborMines(board, r, c)
      }
    }
  }

  return board
}

function countNeighborMines(board, row, col) {
  let count = 0
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue
      const nr = row + dr
      const nc = col + dc
      if (board[nr] && board[nr][nc] && board[nr][nc].isMine) {
        count += 1
      }
    }
  }
  return count
}

function cloneBoard(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })))
}

export function revealCell(board, row, col) {
  const nextBoard = cloneBoard(board)
  const cell = nextBoard[row][col]

  if (cell.isRevealed || cell.isFlagged) {
    return nextBoard
  }

  // Flood-fill reveal
  const queue = []
  queue.push(cell)

  while (queue.length > 0) {
    const current = queue.shift()
    const { row: r, col: c } = current
    const currentCell = nextBoard[r][c]

    if (currentCell.isRevealed || currentCell.isFlagged) continue

    currentCell.isRevealed = true

    if (currentCell.isMine) {
      // Stop flood-fill when hitting a mine; caller handles game over
      continue
    }

    if (currentCell.adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr += 1) {
        for (let dc = -1; dc <= 1; dc += 1) {
          if (dr === 0 && dc === 0) continue
          const nr = r + dr
          const nc = c + dc
          const neighborRow = nextBoard[nr]
          if (!neighborRow) continue
          const neighbor = neighborRow[nc]
          if (!neighbor) continue
          if (!neighbor.isRevealed && !neighbor.isFlagged && !neighbor.isMine) {
            queue.push(neighbor)
          }
        }
      }
    }
  }

  return nextBoard
}

export function toggleFlag(board, row, col) {
  const nextBoard = cloneBoard(board)
  const cell = nextBoard[row][col]

  if (cell.isRevealed) {
    return nextBoard
  }

  cell.isFlagged = !cell.isFlagged
  return nextBoard
}

export function revealAllMines(board) {
  const nextBoard = cloneBoard(board)
  for (let r = 0; r < nextBoard.length; r += 1) {
    for (let c = 0; c < nextBoard[r].length; c += 1) {
      const cell = nextBoard[r][c]
      if (cell.isMine) {
        cell.isRevealed = true
      }
    }
  }
  return nextBoard
}

export function countFlags(board) {
  let flags = 0
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[r].length; c += 1) {
      if (board[r][c].isFlagged) {
        flags += 1
      }
    }
  }
  return flags
}

export function checkWin(board, mineCount) {
  let revealedSafeCells = 0
  let totalSafeCells = 0

  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[r].length; c += 1) {
      const cell = board[r][c]
      if (!cell.isMine) {
        totalSafeCells += 1
        if (cell.isRevealed) {
          revealedSafeCells += 1
        }
      }
    }
  }

  return revealedSafeCells === totalSafeCells && mineCount > 0
}
