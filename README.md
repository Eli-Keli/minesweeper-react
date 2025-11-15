# Minesweeper React

A simple Minesweeper clone built with React and Vite.

## Features

- Classic 9×9 board with 10 mines.
- Left-click to reveal cells; right-click to place or remove flags.
- Status bar showing total mines, flags used, remaining mines, and game status (playing, win, loss).
- "New Game" button to reset the board.

## Getting started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the URL printed by Vite (typically http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint the codebase

```bash
npm run lint
```

## How to play

- **Reveal a cell:** left-click on a covered cell.
  - If the cell contains a mine, the game ends in a loss and all mines are revealed.
  - If the cell is empty (0 adjacent mines), neighboring empty cells and their border of numbered cells are revealed automatically.
- **Place or remove a flag:** right-click on a covered cell to toggle a flag, marking where you think a mine is.
- **Numbers:** a revealed number shows how many mines are in the eight surrounding cells.
- **Winning:** reveal all non-mine cells without clicking on a mine.
