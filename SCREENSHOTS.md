# Screenshots para Preview

Execute o app (`npm run dev` ou `npm run preview`) e capture as telas abaixo para o README/releases.

## Checklist de capturas

### 1. Tela principal (WYSIWYG)
- Sidebar aberta com lista de arquivos
- Editor em modo visual com conteúdo Markdown renderizado
- **Sugestão:** Abra um `.md` com títulos, listas, código e fórmulas

### 2. Modo código
- Clique no ícone `</>` na barra inferior
- Editor em modo CodeMirror com syntax highlighting

### 3. Múltiplas janelas
- Ctrl+N para abrir novo documento
- Duas janelas lado a lado

### 4. Tema escuro (opcional)
- Se houver toggle de tema, capture a versão dark

---

## Onde salvar

Salve as imagens em `docs/screenshots/` com nomes descritivos:

```
docs/screenshots/
├── main-wysiwyg.png      # Tela principal
├── code-mode.png         # Modo código
├── multi-window.png      # Múltiplas janelas
└── dark-theme.png       # (opcional)
```

## Inserir no README

```markdown
## Preview

| WYSIWYG | Modo Código |
|---------|-------------|
| ![Principal](docs/screenshots/main-wysiwyg.png) | ![Código](docs/screenshots/code-mode.png) |
```
