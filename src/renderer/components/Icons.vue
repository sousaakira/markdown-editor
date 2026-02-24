<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="block"
  >
    <!-- FileText -->
    <path v-if="name === 'FileText'" d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline v-if="name === 'FileText'" points="14,2 14,8 20,8" />
    <path v-if="name === 'FileText'" d="M16 13H8" />
    <path v-if="name === 'FileText'" d="M16 17H8" />
    <path v-if="name === 'FileText'" d="M10 9H8" />
    <!-- Save -->
    <path v-if="name === 'Save'" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline v-if="name === 'Save'" points="17,21 17,13 7,13 7,21" />
    <polyline v-if="name === 'Save'" points="7,3 7,8 15,8" />
    <!-- FolderOpen -->
    <path v-if="name === 'FolderOpen'" d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    <!-- Eye -->
    <path v-if="name === 'Eye'" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle v-if="name === 'Eye'" cx="12" cy="12" r="3" />
    <!-- EyeOff -->
    <path v-if="name === 'EyeOff'" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line v-if="name === 'EyeOff'" x1="1" y1="1" x2="23" y2="23" />
    <!-- Columns (split view) -->
    <rect v-if="name === 'Columns'" x="3" y="3" width="7" height="18" rx="1" />
    <rect v-if="name === 'Columns'" x="14" y="3" width="7" height="18" rx="1" />
    <!-- Code -->
    <polyline v-if="name === 'Code'" points="16,18 22,12 16,6" />
    <polyline v-if="name === 'Code'" points="8,6 2,12 8,18" />
    <!-- Menu -->
    <line v-if="name === 'Menu'" x1="4" y1="12" x2="20" y2="12" />
    <line v-if="name === 'Menu'" x1="4" y1="6" x2="20" y2="6" />
    <line v-if="name === 'Menu'" x1="4" y1="18" x2="20" y2="18" />
    <!-- File -->
    <path v-if="name === 'File'" d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline v-if="name === 'File'" points="14,2 14,8 20,8" />
    <!-- Folder -->
    <path v-if="name === 'Folder'" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    <!-- Settings -->
    <circle v-if="name === 'Settings'" cx="12" cy="12" r="3" />
    <!-- Context menu icons -->
    <path v-if="name === 'Scissors'" d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line v-if="name === 'Scissors'" x1="3" y1="6" x2="21" y2="6" />
    <path v-if="name === 'Scissors'" d="M16 10a2 2 0 0 1-2 2 2 2 0 0 1-2-2" />
    <path v-if="name === 'Scissors'" d="M8 10a2 2 0 0 1-2 2 2 2 0 0 1-2-2" />
    <rect v-if="name === 'Copy'" x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path v-if="name === 'Copy'" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    <path v-if="name === 'Clipboard'" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect v-if="name === 'Clipboard'" x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <polyline v-if="name === 'Trash'" points="3,6 5,6 21,6" />
    <path v-if="name === 'Trash'" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line v-if="name === 'Trash'" x1="10" y1="11" x2="10" y2="17" />
    <line v-if="name === 'Trash'" x1="14" y1="11" x2="14" y2="17" />
    <path v-if="name === 'Bold'" d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    <path v-if="name === 'Bold'" d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    <line v-if="name === 'Italic'" x1="19" y1="4" x2="10" y2="4" />
    <line v-if="name === 'Italic'" x1="14" y1="20" x2="5" y2="20" />
    <line v-if="name === 'Italic'" x1="15" y1="4" x2="9" y2="20" />
    <path v-if="name === 'Link'" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path v-if="name === 'Link'" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    <path v-if="name === 'Quote'" d="M3 21c3 0 7-4 7-10V5" />
    <path v-if="name === 'Quote'" d="M15 21c3 0 7-4 7-10V5" />
    <path v-if="name === 'Quote'" d="M21 21v-4a2 2 0 0 0-2-2H5" />
    <line v-if="name === 'List'" x1="8" y1="6" x2="21" y2="6" />
    <line v-if="name === 'List'" x1="8" y1="12" x2="21" y2="12" />
    <line v-if="name === 'List'" x1="8" y1="18" x2="21" y2="18" />
    <line v-if="name === 'List'" x1="3" y1="6" x2="3.01" y2="6" />
    <line v-if="name === 'List'" x1="3" y1="12" x2="3.01" y2="12" />
    <line v-if="name === 'List'" x1="3" y1="18" x2="3.01" y2="18" />
    <path v-if="name === 'ListOrdered'" d="M10 6h11" />
    <path v-if="name === 'ListOrdered'" d="M10 12h11" />
    <path v-if="name === 'ListOrdered'" d="M10 18h11" />
    <path v-if="name === 'ListOrdered'" d="M4 6h1v4" />
    <path v-if="name === 'ListOrdered'" d="M4 10h2" />
    <path v-if="name === 'ListOrdered'" d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    <path v-if="name === 'CheckSquare'" d="M9 11l3 3L22 4" />
    <path v-if="name === 'CheckSquare'" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    <polyline v-if="name === 'ChevronRight'" points="9,18 15,12 9,6" />
    <path v-if="name === 'Settings'" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
</template>
