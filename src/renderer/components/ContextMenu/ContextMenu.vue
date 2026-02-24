<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Icons from '../Icons.vue'

const props = defineProps({
  visible: Boolean,
  x: Number,
  y: Number,
  editor: Object,
  selection: { type: Object, default: () => ({ from: 0, to: 0 }) },
})
const emit = defineEmits(['close'])

const menuRef = ref(null)
const paragraphOpen = ref(false)
const insertOpen = ref(false)
const copyPasteOpen = ref(false)

async function insertImage(ed) {
  const api = window.electronAPI?.file
  if (api?.openImageDialog) {
    const result = await api.openImageDialog()
    if (!result.canceled && result.filePaths?.length) {
      const dataResult = await api.readFileAsDataUrl(result.filePaths[0])
      if (dataResult.success && dataResult.dataUrl) {
        ed.chain().focus().setImage({ src: dataResult.dataUrl }).run()
      }
    }
  } else {
    const url = window.prompt('URL da imagem:', 'https://')
    if (url && url !== 'https://') {
      ed.chain().focus().setImage({ src: url }).run()
    }
  }
  close()
}

function close() {
  paragraphOpen.value = false
  insertOpen.value = false
  copyPasteOpen.value = false
  emit('close')
}

function exec(cmd) {
  const ed = props.editor?.value ?? props.editor
  if (!ed) return
  const { from, to } = props.selection || {}
  const hasRange = typeof from === 'number' && typeof to === 'number' && to >= from
  const needsSelection = ['bold', 'italic', 'link'].includes(cmd)
  if (needsSelection && hasRange) {
    ed.chain().focus().setTextSelection({ from, to })
  }
  switch (cmd) {
    case 'cut':
      document.execCommand('cut')
      break
    case 'copy':
      document.execCommand('copy')
      break
    case 'paste':
      document.execCommand('paste')
      break
    case 'delete':
      ed.chain().focus().deleteSelection().run()
      break
    case 'bold':
      ed.chain().focus().toggleBold().run()
      break
    case 'italic':
      ed.chain().focus().toggleItalic().run()
      break
    case 'code':
      ed.chain().focus().insertContent('```javascript\n\n```', { contentType: 'markdown' }).run()
      break
    case 'link':
      ed.chain().focus().setLink({ href: 'https://' }).run()
      break
    case 'blockquote':
      ed.chain().focus().toggleBlockquote().run()
      break
    case 'bulletList':
      ed.chain().focus().toggleBulletList().run()
      break
    case 'orderedList':
      ed.chain().focus().toggleOrderedList().run()
      break
    case 'taskList':
      ed.chain().focus().toggleTaskList().run()
      break
    case 'paragraph':
      ed.chain().focus().setParagraph().run()
      break
    case 'heading1':
      ed.chain().focus().toggleHeading({ level: 1 }).run()
      break
    case 'heading2':
      ed.chain().focus().toggleHeading({ level: 2 }).run()
      break
    case 'heading3':
      ed.chain().focus().toggleHeading({ level: 3 }).run()
      break
    case 'heading4':
      ed.chain().focus().toggleHeading({ level: 4 }).run()
      break
    case 'heading5':
      ed.chain().focus().toggleHeading({ level: 5 }).run()
      break
    case 'heading6':
      ed.chain().focus().toggleHeading({ level: 6 }).run()
      break
    case 'horizontalRule':
      ed.chain().focus().setHorizontalRule().run()
      break
    case 'image':
      insertImage(ed)
      break
    case 'codeBlock':
      ed.chain().focus().toggleCodeBlock().run()
      break
    default:
      if (cmd.startsWith('codeBlock:')) {
        const lang = cmd.slice('codeBlock:'.length)
        ed.chain().focus().setCodeBlock({ language: lang }).run()
      }
      break
  }
  close()
}

function handleClickOutside(e) {
  const outside = menuRef.value && !menuRef.value.contains(e.target)
  if (outside) close()
}

function handleContextMenu(e) {
  const inMenu = menuRef.value?.contains(e.target)
  const inEditor = e.target?.closest?.('.typora-editor-pane')
  const outside = menuRef.value && !inMenu && !inEditor
  if (outside) close()
}

onMounted(() => {
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('contextmenu', handleContextMenu)
  }, 0)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('contextmenu', handleContextMenu)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="menuRef"
      class="context-menu"
      :style="{ left: `${x}px`, top: `${y}px` }"
      @contextmenu.prevent
    >
      <!-- Clipboard row -->
      <div class="context-menu-row">
        <button type="button" class="context-menu-btn" title="Cortar" @mousedown.prevent @click="exec('cut')">
          <Icons name="Scissors" :size="16" />
        </button>
        <button type="button" class="context-menu-btn" title="Copiar" @mousedown.prevent @click="exec('copy')">
          <Icons name="Copy" :size="16" />
        </button>
        <button type="button" class="context-menu-btn" title="Colar" @mousedown.prevent @click="exec('paste')">
          <Icons name="Clipboard" :size="16" />
        </button>
        <button type="button" class="context-menu-btn" title="Excluir" @mousedown.prevent @click="exec('delete')">
          <Icons name="Trash" :size="16" />
        </button>
      </div>

      <div class="context-menu-divider" />

      <!-- Formatting grid -->
      <div class="context-menu-grid">
        <button type="button" class="context-menu-btn" title="Negrito" @mousedown.prevent @click="exec('bold')">
          <span class="font-bold text-sm">B</span>
        </button>
        <button type="button" class="context-menu-btn" title="Itálico" @mousedown.prevent @click="exec('italic')">
          <span class="italic text-sm">I</span>
        </button>
        <button type="button" class="context-menu-btn" title="Código" @mousedown.prevent @click="exec('code')">
          <Icons name="Code" :size="14" />
        </button>
        <button type="button" class="context-menu-btn" title="Link" @mousedown.prevent @click="exec('link')">
          <Icons name="Link" :size="14" />
        </button>
        <button type="button" class="context-menu-btn" title="Citação" @mousedown.prevent @click="exec('blockquote')">
          <Icons name="Quote" :size="14" />
        </button>
        <button type="button" class="context-menu-btn" title="Lista" @mousedown.prevent @click="exec('bulletList')">
          <Icons name="List" :size="14" />
        </button>
        <button type="button" class="context-menu-btn" title="Lista numerada" @mousedown.prevent @click="exec('orderedList')">
          <Icons name="ListOrdered" :size="14" />
        </button>
        <button type="button" class="context-menu-btn" title="Lista de tarefas" @mousedown.prevent @click="exec('taskList')">
          <Icons name="CheckSquare" :size="14" />
        </button>
      </div>

      <div class="context-menu-divider" />

      <!-- Paragraph submenu -->
      <div class="context-menu-submenu">
        <div class="context-menu-submenu-trigger">
          <span>Parágrafo</span>
          <Icons name="ChevronRight" :size="12" />
        </div>
        <div class="context-menu-submenu-content">
          <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('paragraph')">Parágrafo</button>
          <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('heading1')">Título 1</button>
          <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('heading2')">Título 2</button>
          <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('heading3')">Título 3</button>
          <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('heading4')">Título 4</button>
          <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('heading5')">Título 5</button>
          <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('heading6')">Título 6</button>
        </div>
      </div>

      <!-- Insert submenu -->
      <div class="context-menu-submenu">
        <div class="context-menu-submenu-trigger">
          <span>Inserir</span>
          <Icons name="ChevronRight" :size="12" />
        </div>
        <div class="context-menu-submenu-content">
          <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('image')">Imagem</button>
          <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('horizontalRule')">Linha horizontal</button>
          <div class="context-menu-submenu context-menu-submenu-nested">
            <div class="context-menu-submenu-trigger">
              <span>Bloco de código</span>
              <Icons name="ChevronRight" :size="12" />
            </div>
            <div class="context-menu-submenu-content">
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:javascript')">JavaScript</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:typescript')">TypeScript</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:python')">Python</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:c')">C</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:cpp')">C++</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:xml')">HTML</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:css')">CSS</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:json')">JSON</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:bash')">Bash</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:sql')">SQL</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:go')">Go</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:rust')">Rust</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:java')">Java</button>
              <button type="button" class="context-menu-item" @mousedown.prevent @click="exec('codeBlock:markdown')">Markdown</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
