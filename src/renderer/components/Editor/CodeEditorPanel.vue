<script setup>
import { onMounted, onUnmounted, ref, watch, inject } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, placeholder } from '@codemirror/view'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import { useMarkdownStore } from '../../stores/markdownStore'

const editorRef = ref(null)
const viewRef = ref(null)
const markdownStore = useMarkdownStore()
const getContentForSave = inject('getContentForSave')

onMounted(() => {
  if (!editorRef.value) return

  const state = EditorState.create({
    doc: markdownStore.content,
    extensions: [
      placeholder('Start writing...'),
      markdown({ base: markdownLanguage }),
      history(),
      highlightSelectionMatches(),
      keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        ...searchKeymap,
        {
          key: 'Ctrl-s',
          run: () => {
            window.dispatchEvent(new CustomEvent('file-save'))
            return true
          },
        },
        {
          key: 'Ctrl-Shift-s',
          run: () => {
            window.dispatchEvent(new CustomEvent('file-save-as'))
            return true
          },
        },
        {
          key: 'Ctrl-o',
          run: () => {
            window.dispatchEvent(new CustomEvent('file-open'))
            return true
          },
        },
        {
          key: 'Ctrl-n',
          run: () => {
            window.dispatchEvent(new CustomEvent('file-new'))
            return true
          },
        },
      ]),
      EditorView.theme({
        '&': {
          fontSize: '14px',
          fontFamily: 'var(--monospace, "Lucida Console", Consolas, Courier, monospace)',
        },
        '.cm-scroller': { padding: '30px' },
        '.cm-focused': { outline: 'none' },
        '.cm-content': { maxWidth: '860px', margin: '0 auto' },
      }),
      EditorView.contentAttributes.of({ spellcheck: 'false' }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          markdownStore.setContent(update.state.doc.toString())
        }
      }),
    ],
  })

  const view = new EditorView({
    state,
    parent: editorRef.value,
  })

  viewRef.value = view
  if (getContentForSave) {
    getContentForSave.value = () => view.state.doc.toString()
  }
})

watch(
  () => markdownStore.content,
  (content) => {
    const view = viewRef.value
    if (view && view.state.doc.toString() !== content) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: content },
      })
    }
  }
)

onUnmounted(() => {
  if (getContentForSave) getContentForSave.value = null
  if (viewRef.value) {
    viewRef.value.destroy()
    viewRef.value = null
  }
})
</script>

<template>
  <div class="code-editor-pane flex-1 h-full overflow-auto">
    <div ref="editorRef" class="h-full" />
  </div>
</template>
