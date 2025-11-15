function Cell({ cell, onClick, onRightClick }) {
  const { isRevealed, isMine, isFlagged, adjacentMines } = cell

  let content = ''
  let className = 'cell'

  if (isRevealed) {
    className += ' cell-revealed'
    if (isMine) {
      className += ' cell-mine'
      content = '💣'
    } else if (adjacentMines > 0) {
      className += ` cell-${adjacentMines}`
      content = adjacentMines
    }
  } else if (isFlagged) {
    className += ' cell-flagged'
    content = '🚩'
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {content}
    </button>
  )
}

export default Cell
