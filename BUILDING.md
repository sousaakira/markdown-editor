# Build - Markdown Editor

## Ícone

O ícone é gerado a partir de `assets/icons/icon.svg`:

```bash
python3 convert_icon.py
```

Requer ImageMagick (`convert`). O PNG 512x512 é gerado em `assets/icons/icon.png`.

## Desenvolvimento

```bash
npm run dev
```

## Build para Produção

```bash
npm run build
```

Gera `dist/` com o app pronto para execução via `npm run preview`.

## Build Executável (Electron Builder)

**Linux** (AppImage + .deb):
```bash
npm run build:linux
```

**Windows** (NSIS + Portable):
```bash
npm run build:win
```

**macOS** (DMG + ZIP):
```bash
npm run build:mac
```

**Todas as plataformas**:
```bash
npm run build:all
```

Saída em `dist-electron/`.
