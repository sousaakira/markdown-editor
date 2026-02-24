<script setup>
import { onMounted, onUnmounted, watch, ref, inject } from 'vue'
import { marked } from 'marked'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { TaskList, TaskItem } from '@tiptap/extension-list'
import { Markdown } from '@tiptap/markdown'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { useMarkdownStore } from '../../stores/markdownStore'
import { KeyboardShortcuts } from '../../extensions/keyboardShortcuts'
import ContextMenu from '../ContextMenu/ContextMenu.vue'
import CodeBlockBubbleMenu from './CodeBlockBubbleMenu.vue'

const markdownStore = useMarkdownStore()
const contextMenu = ref({ visible: false, x: 0, y: 0, from: 0, to: 0 })

marked.setOptions({ gfm: true })

function setMarkdownContent(md) {
  if (!editor.value || !md) return
  const html = marked.parse(md)
  editor.value.commands.setContent(html || '<p></p>', { emitUpdate: false })
}

const editor = useEditor({
  content: markdownStore.content,
  contentType: 'markdown',
  extensions: [
    StarterKit.configure({ codeBlock: false }),
    Image.extend({ atom: true }).configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: { class: 'typora-image' },
    }),
    CodeBlockLowlight.configure({ lowlight: createLowlight(common) }),
    KeyboardShortcuts,
    TaskList,
    TaskItem.configure({
      nested: true,
      HTMLAttributes: { class: 'task-item' },
    }),
    Placeholder.configure({ placeholder: 'Start writing...' }),
    Markdown.configure({
      markedOptions: { gfm: true },
      html: false,
    }),
  ],
  editorProps: {
    attributes: {
      class: 'typora-write',
      spellcheck: 'false',
    },
    handleKeyDown: (view, event) => {
      if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        window.dispatchEvent(new CustomEvent(event.shiftKey ? 'file-save-as' : 'file-save'))
        return true
      }
      if (event.key === 'o' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        window.dispatchEvent(new CustomEvent('file-open'))
        return true
      }
      if (event.key === 'n' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        window.dispatchEvent(new CustomEvent('file-new'))
        return true
      }
      if (event.key === 'Enter') {
        const { $from } = view.state.selection
        if ($from.parent.type.name === 'codeBlock') {
          event.preventDefault()
          const { state, dispatch } = view
          dispatch(state.tr.insertText('\n').scrollIntoView())
          return true
        }
      }
      return false
    },
  },
  onUpdate: ({ editor: e }) => {
    try {
      const md = e.getMarkdown?.()
      if (md != null && md !== markdownStore.content) {
        markdownStore.setContent(md)
      }
    } catch {
      // ignore
    }
  },
})

watch(
  () => markdownStore.content,
  (content) => {
    if (!editor.value) return
    const current = editor.value.getMarkdown?.() ?? ''
    if (content !== current) {
      setMarkdownContent(content)
    }
  }
)

const getContentForSave = inject('getContentForSave')
onMounted(() => {
  if (getContentForSave) {
    getContentForSave.value = () => editor.value?.getMarkdown?.() ?? markdownStore.content
  }
  if (editor.value && markdownStore.content) {
    setMarkdownContent(markdownStore.content)
  }
})

onUnmounted(() => {
  if (getContentForSave) getContentForSave.value = null
  editor.value?.destroy()
})

function closeContextMenu() {
  contextMenu.value = { ...contextMenu.value, visible: false }
}

function onContextMenu(e) {
  e.preventDefault()
  const ed = editor.value
  const sel = ed?.state?.selection
  const from = sel?.from ?? 0
  const to = sel?.to ?? 0
  contextMenu.value = { visible: true, x: e.clientX, y: e.clientY, from, to }
}
</script>

<template>
  <div
    class="typora-editor-pane flex-1 h-full overflow-auto"
    @contextmenu.prevent="onContextMenu"
  >
    <editor-content :editor="editor" class="typora-write-container" />
    <CodeBlockBubbleMenu v-if="editor" :editor="editor" />
    <ContextMenu
      :visible="contextMenu.visible"
      :x="contextMenu.x"
      :y="contextMenu.y"
      :editor="editor"
      :selection="{ from: contextMenu.from, to: contextMenu.to }"
      @close="closeContextMenu"
    />
  </div>
</template>
