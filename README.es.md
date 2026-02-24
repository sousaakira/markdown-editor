# Markdown Editor

Editor Markdown inspirado en Typora, construido con Electron y Vue.

[English](README.en.md) · [Português](README.pt-br.md) · [日本語](README.jp.md)

## Vista previa

| Editor WYSIWYG | Modo Código |
|----------------|-------------|
| ![Editor](img/editor_clean.png) | ![Código](img/codigo_suport.png) |

| Barra lateral | Barra lateral + Menú |
|---------------|----------------------|
| ![Sidebar](img/side_bar.png) | ![Sidebar Menu](img/side_bar_menu.png) |

## ✨ Características

- **Vista previa en tiempo real** - Markdown renderizado mientras escribes
- **Modo WYSIWYG y Código** - Alternancia entre edición visual y CodeMirror
- **Operaciones de archivos** - Crear, abrir, guardar (Ctrl+S, Ctrl+O)
- **Nuevo documento en nueva ventana** - Ctrl+N abre nueva ventana
- **Resaltado de sintaxis** - CodeMirror con soporte Markdown
- **Fórmulas LaTeX** - Expresiones matemáticas con KaTeX
- **GitHub Flavored Markdown** - Soporte GFM completo

## 🚀 Tech Stack

- **Electron** - Framework de escritorio
- **Vue 3** - UI con Composition API
- **Vite** - Herramienta de build
- **Tailwind CSS** - Estilos
- **TipTap** - Editor WYSIWYG
- **CodeMirror 6** - Modo código
- **Pinia** - State management

## 🛠️ Comenzar

### Requisitos

- Node.js v18+
- npm

### Instalación

```bash
npm install
npm run dev
```

### Build

```bash
npm run build          # Build de producción
npm run build:linux    # AppImage + .deb
npm run build:win      # NSIS + Portable
npm run build:mac      # DMG + ZIP
```

## ⌨️ Atajos

| Atajo | Acción |
|-------|--------|
| Ctrl+N | Nuevo documento (nueva ventana) |
| Ctrl+O | Abrir archivo |
| Ctrl+S | Guardar |
| Ctrl+Shift+S | Guardar como |

## 📚 Documentación

- [MVP](docs/MVP.md)
- [Roadmap](docs/README.md)
- [Screenshots](SCREENSHOTS.md)

## 📄 Licencia

MIT
