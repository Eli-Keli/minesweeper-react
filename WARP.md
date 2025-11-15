# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

All commands are intended to be run from the project root.

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Vite will print the local dev URL (typically http://localhost:5173).

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

There is no dedicated test runner configured yet; if you need tests, set up a framework (e.g. Vitest or Jest) and add appropriate `test` scripts to `package.json`.

## Project structure and architecture

This repo is a single-page React application built with Vite that implements a classic Minesweeper clone.

### Tooling

- **Bundler/dev server:** Vite (see `vite.config.js`).
- **UI library:** React 19 with `react-dom`.
- **Linting:** ESLint with the `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` plugins. Linting is invoked via `npm run lint`, which currently targets the entire repo (`eslint .`).

### Application entrypoints

- `src/main.jsx` is the JS entrypoint. It:
  - Imports global styles from `src/index.css`.
  - Renders the root React component into the DOM element with id `root` using `createRoot` from `react-dom/client`.
  - Wraps the app in `React.StrictMode`.
- `src/App.jsx` is the root React component. It renders the Minesweeper title and mounts the `Game` component.
- `src/Game.jsx` owns the main game state (board, game status, and counters) and wires user interactions to the pure logic helpers in `src/gameLogic.js`.
- `src/components/Board.jsx` renders the grid of cells using the board state.
- `src/components/Cell.jsx` is the visual representation of a single cell (hidden, revealed, mine, flagged).

When adding new routes or global providers (e.g. context, state management, theming), they should typically be wired through `src/main.jsx`, with page-level or feature-level composition happening inside `src/App.jsx` or its children.

### Styling

- `src/index.css` defines global styles, including base typography, color scheme, and body layout.
- `src/App.css` contains styles scoped to the Minesweeper layout, status bar, board grid, and cell states.

For additional UI work, prefer keeping global styles in `index.css` and component- or feature-specific styles in separate CSS modules or files imported by those components.

## Notes derived from README

The `README.md` describes the Minesweeper game, how to run it via the npm scripts in `package.json`, and how to interact with the board (clicks, flags, and win/loss conditions).
