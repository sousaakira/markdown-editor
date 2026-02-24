<script setup>
import { ref, watch } from 'vue'
import Icons from '../Icons.vue'
import { useMarkdownStore } from '../../stores/markdownStore'
import { FileOperations } from '../../utils/fileOperations'

const markdownStore = useMarkdownStore()
const fileOps = new FileOperations()

const folderFiles = ref([])
const folderLoading = ref(false)

function currentFileName() {
  return markdownStore.filePath ? markdownStore.filePath.split(/[/\\]/).pop() : 'Untitled'
}

function folderName() {
  const fp = markdownStore.folderPath
  return fp ? fp.split(/[/\\]/).pop() || fp : ''
}

async function loadFolderFiles() {
  const folder = markdownStore.folderPath
  if (!folder) {
    folderFiles.value = []
    return
  }
  folderLoading.value = true
  const result = await fileOps.listDir(folder)
  folderFiles.value = result.success ? result.files : []
  folderLoading.value = false
}

watch(
  () => markdownStore.folderPath,
  () => loadFolderFiles(),
  { immediate: true }
)

const emit = defineEmits(['open-file-by-path'])

function handleOpenFile(filePath) {
  if (filePath === markdownStore.filePath) return
  emit('open-file-by-path', filePath)
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Files</h2>
    </div>

    <div class="sidebar-content">
      <div class="sidebar-section">
        <div class="sidebar-item sidebar-item-current" :title="markdownStore.filePath || 'Novo documento'">
          <Icons name="File" :size="16" class="sidebar-icon" />
          <span class="sidebar-text">{{ currentFileName() }}</span>
        </div>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-title">
          {{ folderName() || 'Pasta' }}
        </div>
        <div v-if="!markdownStore.folderPath" class="sidebar-empty">
          Abra ou salve um arquivo para ver os arquivos da pasta
        </div>
        <div v-else-if="folderLoading" class="sidebar-empty">Carregando...</div>
        <div v-else-if="!folderFiles.length" class="sidebar-empty">Nenhum .md nesta pasta</div>
        <div
          v-else
          v-for="filePath in folderFiles"
          :key="filePath"
          class="sidebar-item sidebar-btn sidebar-item-file"
          :class="{ active: filePath === markdownStore.filePath }"
          @click="handleOpenFile(filePath)"
        >
          <Icons name="File" :size="14" class="sidebar-icon" />
          <span class="sidebar-text" :title="filePath">{{ filePath.split(/[/\\]/).pop() }}</span>
        </div>
      </div>
    </div>

    <div class="sidebar-footer">
      <button type="button" class="sidebar-item sidebar-btn" title="Configurações (em breve)">
        <Icons name="Settings" :size="16" class="sidebar-icon" />
        <span class="sidebar-text">Configurações</span>
      </button>
    </div>
  </div>
</template>
