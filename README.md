# Many Windows

<p align="center">
  <img src="https://img.shields.io/badge/Tauri-2-24C8DB?style=for-the-badge&logo=tauri&logoColor=white" alt="Tauri 2" />
  <img src="https://img.shields.io/badge/Rust-CE422B?style=for-the-badge&logo=rust&logoColor=white" alt="Rust" />
  <img src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/KPZ231/many-windows?style=flat-square" alt="License" />
  <img src="https://img.shields.io/github/stars/KPZ231/many-windows?style=flat-square" alt="Stars" />
  <img src="https://img.shields.io/github/issues/KPZ231/many-windows?style=flat-square" alt="Issues" />
  <img src="https://img.shields.io/github/last-commit/KPZ231/many-windows?style=flat-square" alt="Last commit" />
</p>

**Many Windows** is a desktop application by **KPZsProductions** that lets you create your own fully customizable floating windows (screen overlays) and display them directly on your desktop. The app ships with a set of prebuilt screens, and thanks to a built-in WYSIWYG editor, any user — even without technical knowledge — can build their own window and customize how their screen looks.

---

## Features

- **Floating windows** — undecorated, always-on-top windows, toggled with one click from the main app.
- **WYSIWYG editor** *(work in progress)* — a custom-built "what you see is what you get" editor for creating windows without writing code.
- **Built-in screen code editor** — for advanced users, powered by a VS Code extension embedded inside the app.
- **CLI package** — an alternative way to edit screens locally from the user's own terminal, without opening the GUI.
- **Prebuilt screen templates** — a library of ready-made widgets to start from.
- **Multi-window** — management of multiple independent native windows from a single application process.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Desktop runtime | [Tauri v2](https://tauri.app/) (Rust) |
| Frontend | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Bundler / dev server | [Vite](https://vitejs.dev/) |
| Styling | [TailwindCSS v4](https://tailwindcss.com/) |
| Built-in code editor | VS Code extension embedded in the app |
| Local editing | dedicated CLI package |
| Visual editor | custom WYSIWYG editor *(planned)* |

---

## Architecture

```
many-windows/
├── src/                  # Frontend (React + TypeScript)
│   └── App.tsx            # Main UI, invoke("floating") to toggle the window
├── src-tauri/              # Backend (Rust / Tauri)
│   ├── src/
│   │   ├── lib.rs          # Entry point (run()), Tauri commands, window creation
│   │   └── main.rs         # Calls lib.rs::run()
│   ├── capabilities/        # Per-window permission scope (default.json)
│   └── tauri.conf.json      # Main window config, icons, build hooks
├── vite.config.ts
└── package.json
```

Every new webview window loads the same frontend bundle (`index.html`) — a window's role/content is decided at runtime based on its Tauri window label, not through separate HTML entry points.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Rust](https://www.rust-lang.org/tools/install) + the toolchain required by [Tauri](https://tauri.app/start/prerequisites/)

### Development

```bash
# install dependencies
npm install

# run Vite only (frontend, port 1420)
npm run dev

# run the full Tauri app (Rust + frontend hot-reload)
npm run tauri dev
```

### Production build

```bash
# typecheck + frontend build
npm run build

# full desktop bundle (installer/binary)
npm run tauri build
```

---

## Roadmap

- [ ] Custom WYSIWYG editor for visually building windows
- [ ] VS Code extension embedded as the built-in screen code editor
- [ ] CLI package for local screen editing
- [ ] Library of ready-to-use screen templates
- [ ] Import/export system for custom windows

---

## Contributing

The project is under active development. Issues and pull requests are welcome — check `CLAUDE.md` in the repo for architecture notes before submitting a PR.

---

## License

See the [LICENSE](./LICENSE) file.

---

<p align="center">Made by <b><a href="https://www.kpzsproductions.pl">KPZsProductions<a></b></p>
