# Markdown Editor

Typora-inspired Markdown editor built with Electron and Vue.

[Português](README.pt-br.md) · [Español](README.es.md) · [日本語](README.jp.md)

## Preview

| WYSIWYG Editor | Code Mode |
|----------------|-----------|
| ![Editor](img/editor_clean.png) | ![Code](img/codigo_suport.png) |

| Sidebar | Sidebar + Menu |
|---------|----------------|
| ![Sidebar](img/side_bar.png) | ![Sidebar Menu](img/side_bar_menu.png) |

## ✨ Features

- **Real-time preview** - Markdown rendered as you type
- **WYSIWYG & Code modes** - Switch between visual editing and CodeMirror
- **File operations** - Create, open, save (Ctrl+S, Ctrl+O)
- **New document in new window** - Ctrl+N opens a new window
- **Syntax highlighting** - CodeMirror with Markdown support
- **LaTeX formulas** - Math expressions with KaTeX
- **GitHub Flavored Markdown** - Full GFM support

## 🚀 Tech Stack

- **Electron** - Desktop framework
- **Vue 3** - UI with Composition API
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **TipTap** - WYSIWYG editor
- **CodeMirror 6** - Code mode
- **Pinia** - State management

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
npm install
npm run dev
```

### Build

```bash
npm run build          # Production build
npm run build:linux    # AppImage + .deb
npm run build:win     # NSIS + Portable
npm run build:mac     # DMG + ZIP
```

## ⌨️ Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+N | New document (new window) |
| Ctrl+O | Open file |
| Ctrl+S | Save |
| Ctrl+Shift+S | Save as |

## 📚 Documentation

- [MVP](docs/MVP.md)
- [Roadmap](docs/README.md)
- [Screenshots](SCREENSHOTS.md)

## 📄 License

MIT
