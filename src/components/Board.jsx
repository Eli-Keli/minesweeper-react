import Cell from './Cell'

function Board({ board, onCellClick, onCellRightClick, disabled }) {
  const rows = board.length
  const cols = rows > 0 ? board[0].length : 0

  const handleClick = (row, col) => {
    if (disabled) return
    onCellClick(row, col)
  }

  const handleRightClick = (event, row, col) => {
    if (disabled) return
    onCellRightClick(event, row, col)
  }

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${cols}, 32px)`,
      }}
    >
      {board.map((row, rIndex) =>
        row.map((cell, cIndex) => (
          <Cell
            key={`${rIndex}-${cIndex}`}
            cell={cell}
            onClick={() => handleClick(rIndex, cIndex)}
            onRightClick={(event) => handleRightClick(event, rIndex, cIndex)}
          />
        )),
      )}
    </div>
  )
}

export default Board
