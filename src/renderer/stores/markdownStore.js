import { defineStore } from 'pinia'
import { ref } from 'vue'

export const EDITOR_MODES = { WYSIWYG: 'wysiwyg', CODE: 'code' }

const RECENT_KEY = 'markdown-editor-recent-files'
const RECENT_MAX = 10

function loadRecentFiles() {
  try {
    const s = localStorage.getItem(RECENT_KEY)
    return s ? JSON.parse(s) : []
  } catch {
    return []
  }
}

function saveRecentFiles(files) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(files.slice(0, RECENT_MAX)))
  } catch {
    // ignore
  }
}

export const useMarkdownStore = defineStore('markdown', () => {
  const content = ref('')
  const filePath = ref('')
  const folderPath = ref('')
  const isDirty = ref(false)
  const editorMode = ref(EDITOR_MODES.WYSIWYG)
  const recentFiles = ref(loadRecentFiles())
  if (!filePath.value && recentFiles.value.length) {
    folderPath.value = recentFiles.value[0].replace(/[/\\][^/\\]*$/, '')
  }

  function setContent(newContent) {
    const changed = newContent !== content.value
    content.value = newContent
    if (changed) isDirty.value = true
  }

  function setFilePath(path) {
    filePath.value = path
    if (path) {
      folderPath.value = path.replace(/[/\\][^/\\]*$/, '')
      const list = recentFiles.value.filter((p) => p !== path)
      list.unshift(path)
      recentFiles.value = list
      saveRecentFiles(list)
    } else {
      folderPath.value = recentFiles.value[0] ? recentFiles.value[0].replace(/[/\\][^/\\]*$/, '') : ''
    }
  }

  function removeRecentFile(path) {
    recentFiles.value = recentFiles.value.filter((p) => p !== path)
    saveRecentFiles(recentFiles.value)
  }

  function setDirty(dirty) {
    isDirty.value = dirty
  }

  function reset() {
    content.value = ''
    filePath.value = ''
    isDirty.value = false
  }

  function clearDirty() {
    isDirty.value = false
  }

  function setEditorMode(mode) {
    if (mode === EDITOR_MODES.WYSIWYG || mode === EDITOR_MODES.CODE) {
      editorMode.value = mode
    }
  }

  function toggleEditorMode() {
    editorMode.value = editorMode.value === EDITOR_MODES.WYSIWYG ? EDITOR_MODES.CODE : EDITOR_MODES.WYSIWYG
  }

  return {
    content,
    filePath,
    folderPath,
    isDirty,
    editorMode,
    recentFiles,
    setContent,
    setFilePath,
    removeRecentFile,
    setDirty,
    reset,
    clearDirty,
    setEditorMode,
    toggleEditorMode,
  }
})
