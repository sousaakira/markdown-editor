# Markdown Editor (JavaScript Version)

A modern Markdown editor inspired by Typora, built with Electron and React **using pure JavaScript**.

## ✨ Features

- **Real-time preview** - See your Markdown rendered as you type
- **Dual-pane editing** - Switch between editor and preview modes
- **File operations** - Create, open, save, and save as Markdown files
- **Syntax highlighting** - Beautiful code highlighting with CodeMirror
- **Dark/Light themes** - Easy switching between themes
- **Math support** - LaTeX mathematical expressions with KaTeX
- **GitHub Flavored Markdown** - Full support for GFM features

## 🚀 Tech Stack

- **Electron** - Desktop application framework
- **React** - UI framework
- **JavaScript** - Pure JavaScript (no TypeScript!)
- **Tailwind CSS** - Utility-first CSS framework
- **CodeMirror 6** - Code editor component
- **Zustand** - State management
- **React Markdown** - Markdown rendering
- **Mermaid** - Diagram support

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation & Development

#### Quick Start (Recommended)
```bash
./start-dev.sh
```

#### Manual Setup
```bash
# Install dependencies
npm install

# Start React development server only
npm run dev:renderer

# Or start both Electron + React
npm run dev
```

**Open:** http://localhost:5173

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
markdown-editor/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── main.js          # Main process entry
│   │   └── preload.js       # Preload script
│   ├── renderer/            # React renderer process
│   │   ├── components/     # React components (.tsx)
│   │   ├── stores/         # State management (.js)
│   │   └── utils/          # Utility functions (.js)
│   └── ...
├── docs/                   # Documentation
└── package.json            # Config updated
```

## ✅ Why JavaScript Version?

- **⚡ Faster Development** - No TypeScript compilation
- **🛠️ Simpler Setup** - Less configuration
- **📦 Smaller Bundle** - Fewer dependencies
- **🚀 Ready to Use** - Quick prototyping
- **🔧 Less Headaches** - No type errors

## 🎯 Key Components

### Editor
- CodeMirror 6 with Markdown support
- Real-time syntax highlighting
- Custom keybindings (Ctrl+S, Ctrl+O, Ctrl+N)

### Preview  
- React Markdown with GFM support
- Code syntax highlighting
- Math equations with KaTeX
- Responsive design

### UI
- Clean, modern interface
- Dark/light theme support
- Toolbar with file operations
- Collapsible sidebar

## 📚 Documentation

- [🚀 MVP Status](docs/MVP.md) - Current implementation status
- [🔄 JavaScript Conversion](docs/JAVASCRIPT_VERSION.md) - Why we switched to JS
- [🎯 Roadmap](docs/README.md) - Development roadmap

## 🚀 Development Workflow

1. **Start**: `npm run dev:renderer` or `./start-dev.sh`
2. **Edit**: Changes hot-reload automatically
3. **Test**: Use the app to test features
4. **Build**: `npm run build` for production

## 🔧 Available Scripts

```bash
npm run dev          # Start Electron + React
npm run dev:renderer # Start React only (recommended)
npm run dev:main     # Start Electron only
npm run build        # Build for production
npm run lint         # Run ESLint
```

## 🎉 Roadmap

See `docs/README.md` for complete development roadmap:

- **Phase 1** ✅ - MVP (Complete)
- **Phase 2** 🔄 - Features Essenciais
- **Phase 3** 📋 - Produtividade
- **Phase 4** 🚀 - Avançado

## 📝 Contributing

1. Fork the repo
2. Create feature branch
3. Make changes
4. Test functionality
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using JavaScript, React, and Electron**