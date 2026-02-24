<script setup>
import { ref, provide, watch, onMounted, onUnmounted } from 'vue'
import { useMarkdownStore, EDITOR_MODES } from './stores/markdownStore'
import { FileOperations } from './utils/fileOperations'
import FooterBar from './components/FooterBar/FooterBar.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import EditorPanel from './components/Editor/EditorPanel.vue'
import CodeEditorPanel from './components/Editor/CodeEditorPanel.vue'

const SIDEBAR_MIN = 180
const SIDEBAR_MAX = 480
const SIDEBAR_DEFAULT = 256

function loadSidebarWidth() {
  try {
    const w = parseInt(localStorage.getItem('markdown-editor-sidebar-width'), 10)
    return Number.isFinite(w) && w >= SIDEBAR_MIN && w <= SIDEBAR_MAX ? w : SIDEBAR_DEFAULT
  } catch {
    return SIDEBAR_DEFAULT
  }
}

function loadSidebarOpen() {
  try {
    const v = localStorage.getItem('markdown-editor-sidebar-open')
    return v === 'true'
  } catch {
    return false
  }
}

const isSidebarOpen = ref(loadSidebarOpen())

watch(isSidebarOpen, (v) => {
  try {
    localStorage.setItem('markdown-editor-sidebar-open', String(v))
  } catch {
    // ignore
  }
})
const sidebarWidth = ref(loadSidebarWidth())

const resizeStartX = ref(null)
const resizeStartWidth = ref(0)

function resizeSidebar(e) {
  if (resizeStartX.value == null) return
  const delta = e.clientX - resizeStartX.value
  let w = resizeStartWidth.value + delta
  w = Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, w))
  sidebarWidth.value = w
}

function onResizeStart(e) {
  resizeStartX.value = e.clientX
  resizeStartWidth.value = sidebarWidth.value
  window.addEventListener('mousemove', resizeSidebar)
  window.addEventListener('mouseup', onResizeEnd)
}

function onResizeEnd() {
  resizeStartX.value = null
  window.removeEventListener('mousemove', resizeSidebar)
  window.removeEventListener('mouseup', onResizeEnd)
  try {
    localStorage.setItem('markdown-editor-sidebar-width', String(sidebarWidth.value))
  } catch {
    // ignore
  }
}

const markdownStore = useMarkdownStore()
const fileOps = new FileOperations()

const getContentForSave = ref(null)
provide('getContentForSave', getContentForSave)

function getContent() {
  const fn = getContentForSave.value
  return (typeof fn === 'function' ? fn() : null) ?? markdownStore.content
}

const EDITOR_NAME = 'Markdown Editor'

function updateTitle() {
  const doc = markdownStore.filePath ? markdownStore.filePath.split(/[/\\]/).pop() : 'Untitled'
  const dirty = markdownStore.isDirty ? '*' : ''
  document.title = `${doc}${dirty} - ${EDITOR_NAME}`
}

watch(
  () => [markdownStore.filePath, markdownStore.isDirty],
  updateTitle,
  { immediate: true }
)

async function handleSave() {
  const content = getContent()
  if (markdownStore.filePath) {
    const result = await fileOps.saveFile(markdownStore.filePath, content)
    if (result.success) markdownStore.clearDirty()
    else console.error('Failed to save file:', result.error)
  } else {
    await handleSaveAs()
  }
}

async function handleSaveAs() {
  const content = getContent()
  const result = await fileOps.saveFileAs(content)
  if (result.success && result.filePath) {
    markdownStore.setFilePath(result.filePath)
    markdownStore.clearDirty()
  }
}

async function confirmSwitchDocument() {
  if (!markdownStore.isDirty) return true
  const choice = await fileOps.confirmUnsaved()
  if (choice === 'cancel') return false
  if (choice === 'save') {
    await handleSave()
    if (markdownStore.isDirty) return false
  }
  return true
}

async function handleNewDocument() {
  if (!(await confirmSwitchDocument())) return
  markdownStore.setContent('')
  markdownStore.setFilePath('')
  markdownStore.clearDirty()
}

async function handleOpenDocument() {
  if (!(await confirmSwitchDocument())) return
  const result = await fileOps.openFile()
  if (result.success && result.content !== undefined && result.filePath !== undefined) {
    markdownStore.setContent(result.content)
    markdownStore.setFilePath(result.filePath)
    markdownStore.clearDirty()
  }
}

async function handleOpenFileByPath(filePath) {
  if (filePath === markdownStore.filePath) return
  if (!(await confirmSwitchDocument())) return
  const result = await fileOps.openFileByPath(filePath)
  if (result.success && result.content !== undefined && result.filePath) {
    markdownStore.setContent(result.content)
    markdownStore.setFilePath(result.filePath)
    markdownStore.clearDirty()
  }
}

function onFileSave() {
  handleSave()
}

function onFileSaveAs() {
  handleSaveAs()
}

onMounted(() => {
  const api = window.electronAPI
  if (api) {
    api.file.onNewFile(handleNewDocument)
    api.file.onOpenFile(handleOpenDocument)
    api.file.onSaveFile(onFileSave)
    api.file.onSaveAsFile(onFileSaveAs)
    api.file.onOpenFileFromPath((filePath) => handleOpenFileByPath(filePath))
  }

  window.addEventListener('file-save', onFileSave)
  window.addEventListener('file-save-as', onFileSaveAs)
})

onUnmounted(() => {
  window.removeEventListener('file-save', onFileSave)
  window.removeEventListener('file-save-as', onFileSaveAs)

  const api = window.electronAPI
  if (!api) return
  api.removeAllListeners('file-new')
  api.removeAllListeners('file-open')
  api.removeAllListeners('file-save')
  api.removeAllListeners('file-save-as')
  api.removeAllListeners('open-file-from-path')
})
</script>

<template>
  <div class="typora-layout flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
      <div v-show="isSidebarOpen" class="sidebar-container flex flex-shrink-0">
        <Sidebar
          class="sidebar-resizable"
          :style="{ width: sidebarWidth + 'px' }"
          @open-file-by-path="handleOpenFileByPath"
        />
        <div
          class="sidebar-resize-handle"
          title="Redimensionar sidebar"
          @mousedown.prevent="onResizeStart"
        />
      </div>

      <div class="flex-1 overflow-hidden typora-editor-area flex flex-col">
        <EditorPanel v-if="markdownStore.editorMode === EDITOR_MODES.WYSIWYG" />
        <CodeEditorPanel v-else />
      </div>
    </div>

    <FooterBar
      :is-sidebar-open="isSidebarOpen"
      :is-code-mode="markdownStore.editorMode === EDITOR_MODES.CODE"
      @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
      @toggle-editor-mode="markdownStore.toggleEditorMode"
    />
  </div>
</template>
