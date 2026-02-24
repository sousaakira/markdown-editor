<script setup>
import Icons from '../Icons.vue'

defineProps({
  isSidebarOpen: Boolean,
  isCodeMode: Boolean,
})

const emit = defineEmits(['toggle-sidebar', 'toggle-editor-mode'])
</script>

<template>
  <div class="footer-bar">
    <div class="footer-bar-buttons">
      <button
        type="button"
        class="footer-btn"
        :title="isSidebarOpen ? 'Ocultar sidebar' : 'Mostrar sidebar'"
        @click="emit('toggle-sidebar')"
      >
        <Icons name="Menu" :size="14" />
      </button>
      <button
        type="button"
        class="footer-btn"
        :title="isCodeMode ? 'Modo WYSIWYG' : 'Modo código'"
        @click="emit('toggle-editor-mode')"
      >
        <Icons :name="isCodeMode ? 'Eye' : 'Code'" :size="14" />
      </button>
    </div>
  </div>
</template>
