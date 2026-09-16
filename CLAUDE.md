# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Tauri v2 + React 19 + TypeScript + Vite desktop app. Purpose: spawn/manage multiple OS windows (currently a single "floating" always-on-top, undecorated window toggled from the frontend).

## Commands

- `npm run dev` — Vite dev server only (port 1420, fixed in `vite.config.ts`)
- `npm run tauri dev` — full Tauri app (builds Rust, opens native window, hot-reloads frontend)
- `npm run build` — `tsc` typecheck + `vite build` (frontend only)
- `npm run tauri build` — production desktop bundle
- No test suite and no lint script configured.
- Rust side: standard `cargo build`/`cargo check` from `src-tauri/` also work independently.

## Architecture

- Frontend (`src/`) talks to Rust via `@tauri-apps/api/core`'s `invoke(command, args)`. Commands are defined as `#[tauri::command]` functions in `src-tauri/src/lib.rs` and must be registered in the `tauri::generate_handler![...]` list there — adding a new Rust command requires both steps.
- `src-tauri/src/lib.rs` is the actual app entry point (`pub fn run()`); `main.rs` just calls it. Window creation/management logic (e.g. the `floating` command) lives here using `tauri::WebviewWindowBuilder` / `AppHandle::webview_windows()`.
- New webview windows all load the same frontend bundle (`WebviewUrl::App("index.html")`) — there's no separate HTML entry per window, so a window's role/content must be decided at runtime inside the React app (e.g. by checking the Tauri window label).
- Window-level native properties (size, position, decorations, always-on-top, etc.) are set in Rust when the window is built, not in React.
- `src-tauri/tauri.conf.json` defines the default "main" window and build hooks (`beforeDevCommand`/`beforeBuildCommand` run the npm scripts above automatically under `tauri dev`/`tauri build`).
- `src-tauri/capabilities/default.json` scopes permissions to the "main" window only (`core:default`, `opener:default`). Any new window that needs Tauri APIs beyond what's already granted must be added to a capability's `windows` list or get its own capability file.
- `src/App.tsx`'s form calls `invoke("floating")` to toggle the floating window, matching the only registered command in `lib.rs`.
