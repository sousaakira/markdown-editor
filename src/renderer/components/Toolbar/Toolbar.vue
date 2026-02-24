<script setup>
import Icons from '../Icons.vue'

defineProps({
  isSidebarOpen: Boolean,
})

const emit = defineEmits(['toggle-sidebar', 'save-as'])

function handleNew() {
  window.dispatchEvent(new CustomEvent('file-new'))
}

function handleOpen() {
  window.dispatchEvent(new CustomEvent('file-open'))
}

function handleSave() {
  window.dispatchEvent(new CustomEvent('file-save'))
}
</script>

<template>
  <div class="flex items-center justify-between h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4">
    <div class="flex items-center space-x-2">
      <button
        type="button"
        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        title="New File (Ctrl+N)"
        @click="handleNew"
      >
        <Icons name="FileText" :size="16" />
      </button>
      <button
        type="button"
        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        title="Open File (Ctrl+O)"
        @click="handleOpen"
      >
        <Icons name="FolderOpen" :size="16" />
      </button>
      <button
        type="button"
        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        title="Save (Ctrl+S)"
        @click="handleSave"
      >
        <Icons name="Save" :size="16" />
      </button>
      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />
      <button
        type="button"
        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        :title="isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'"
        @click="emit('toggle-sidebar')"
      >
        <Icons name="Menu" :size="16" />
      </button>
    </div>

    <div class="flex items-center space-x-2">
      <button
        type="button"
        class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        title="Save As"
        @click="emit('save-as')"
      >
        <Icons name="Save" :size="16" />
      </button>
    </div>
  </div>
</template>
