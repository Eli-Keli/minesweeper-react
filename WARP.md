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

This repo is a single-page React application built with Vite.

### Tooling

- **Bundler/dev server:** Vite (see `vite.config.js`).
- **UI library:** React 19 with `react-dom`.
- **Linting:** ESLint with the `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` plugins. Linting is invoked via `npm run lint`, which currently targets the entire repo (`eslint .`).

### Application entrypoints

- `src/main.jsx` is the JS entrypoint. It:
  - Imports global styles from `src/index.css`.
  - Renders the root React component into the DOM element with id `root` using `createRoot` from `react-dom/client`.
  - Wraps the app in `React.StrictMode`.
- `src/App.jsx` is the root React component. It currently contains the default Vite + React counter example using `useState` and references assets under `src/assets/`.

When adding new routes or global providers (e.g. context, state management, theming), they should typically be wired through `src/main.jsx`, with page-level or feature-level composition happening inside `src/App.jsx` or its children.

### Styling

- `src/index.css` defines global styles, including base typography, color scheme, and body layout.
- `src/App.css` contains styles scoped to the root app layout and demo components (logo animations, card layout, etc.).

For additional UI work, prefer keeping global styles in `index.css` and component- or feature-specific styles in separate CSS modules or files imported by those components.

## Notes derived from README

The `README.md` is the default Vite React template README. Relevant points:

- The project currently uses the standard React plugin for Vite (`@vitejs/plugin-react`).
- The React Compiler is not enabled; if you introduce it, follow the official React documentation for configuration.
- If this app grows into a production application, consider migrating to the TypeScript template or adding TypeScript with type-aware ESLint rules as documented in the Vite React + TS template.
