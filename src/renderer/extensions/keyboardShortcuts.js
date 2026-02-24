import { Extension } from '@tiptap/core'

/**
 * Atalhos: Mod = Ctrl (Win/Linux) ou Cmd (Mac)
 * Ctrl+Shift+K = bloco código javascript | Ctrl+Alt+C = toggle bloco | Ctrl+K = link
 */
export const KeyboardShortcuts = Extension.create({
  name: 'keyboardShortcuts',
  addKeyboardShortcuts() {
    return {
      'Mod-Shift-k': () =>
        this.editor.commands.insertContent('```javascript\n\n```', {
          contentType: 'markdown',
        }),
      'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock(),
      'Mod-e': () => this.editor.commands.toggleCode(),
      'Mod-k': () => this.editor.commands.setLink({ href: 'https://' }),
      'Mod-Shift-b': () => this.editor.commands.toggleBlockquote(),
    }
  },
})
