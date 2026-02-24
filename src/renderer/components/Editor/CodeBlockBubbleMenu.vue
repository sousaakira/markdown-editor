<script setup>
import { BubbleMenu } from '@tiptap/vue-3/menus'

const props = defineProps({
  editor: { type: Object, required: true },
})

const LANGUAGES = [
  { value: '', label: 'Plain' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'xml', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'bash', label: 'Bash' },
  { value: 'sql', label: 'SQL' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'java', label: 'Java' },
  { value: 'markdown', label: 'Markdown' },
]

function shouldShow({ editor }) {
  return editor.isActive('codeBlock')
}

function getReferencedVirtualElement() {
  const view = props.editor?.view
  if (!view) return null
  const { state } = view
  const { $from } = state.selection
  if ($from.parent.type.name !== 'codeBlock') return null
  const pos = $from.before($from.depth)
  const pre = view.nodeDOM(pos)
  if (!pre || !pre.getBoundingClientRect) return null
  return {
    getBoundingClientRect: () => {
      const rect = pre.getBoundingClientRect()
      return new DOMRect(rect.left, rect.bottom, rect.width, 1)
    },
  }
}

function onLangChange(e) {
  const lang = e.target.value || null
  props.editor.chain().focus().updateAttributes('codeBlock', { language: lang }).run()
}

function currentLang() {
  const attrs = props.editor.getAttributes('codeBlock')
  return attrs.language || ''
}
</script>

<template>
  <BubbleMenu
    :editor="editor"
    :should-show="shouldShow"
    :get-referenced-virtual-element="getReferencedVirtualElement"
    plugin-key="codeBlockLang"
    :options="{ placement: 'bottom-end', offset: { mainAxis: 6, crossAxis: 4 } }"
    class="code-block-bubble-menu"
  >
    <select
      class="code-block-lang-select"
      :value="currentLang()"
      @change="onLangChange"
      @mousedown.stop
    >
      <option v-for="opt in LANGUAGES" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </BubbleMenu>
</template>
