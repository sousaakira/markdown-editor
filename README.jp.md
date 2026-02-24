# Markdown Editor

Typora風のMarkdownエディタ。ElectronとVueで構築。

[English](README.en.md) · [Português](README.pt-br.md) · [Español](README.es.md)

## プレビュー

| WYSIWYGエディタ | コードモード |
|-----------------|--------------|
| ![Editor](img/editor_clean.png) | ![Code](img/codigo_suport.png) |

| サイドバー | サイドバー + メニュー |
|------------|------------------------|
| ![Sidebar](img/side_bar.png) | ![Sidebar Menu](img/side_bar_menu.png) |

## ✨ 機能

- **リアルタイムプレビュー** - 入力と同時にMarkdownをレンダリング
- **WYSIWYG & コードモード** - ビジュアル編集とCodeMirrorを切り替え
- **ファイル操作** - 作成、開く、保存（Ctrl+S、Ctrl+O）
- **新規ドキュメントは新規ウィンドウ** - Ctrl+Nで新規ウィンドウを開く
- **シンタックスハイライト** - CodeMirrorでMarkdown対応
- **LaTeX数式** - KaTeXで数式表示
- **GitHub Flavored Markdown** - GFM完全対応

## 🚀 Tech Stack

- **Electron** - デスクトップフレームワーク
- **Vue 3** - Composition APIでUI
- **Vite** - ビルドツール
- **Tailwind CSS** - スタイリング
- **TipTap** - WYSIWYGエディタ
- **CodeMirror 6** - コードモード
- **Pinia** - 状態管理

## 🛠️ はじめに

### 必要環境

- Node.js v18+
- npm

### インストール

```bash
npm install
npm run dev
```

### ビルド

```bash
npm run build          # 本番ビルド
npm run build:linux    # AppImage + .deb
npm run build:win      # NSIS + Portable
npm run build:mac      # DMG + ZIP
```

## ⌨️ ショートカット

| ショートカット | 操作 |
|----------------|------|
| Ctrl+N | 新規ドキュメント（新規ウィンドウ） |
| Ctrl+O | ファイルを開く |
| Ctrl+S | 保存 |
| Ctrl+Shift+S | 名前を付けて保存 |

## 📚 ドキュメント

- [MVP](docs/MVP.md)
- [Roadmap](docs/README.md)
- [Screenshots](SCREENSHOTS.md)

## 📄 ライセンス

MIT
