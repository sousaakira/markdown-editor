<script setup>
import { ref, watch } from 'vue'
import { useMarkdownStore } from '../../stores/markdownStore'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'

const markdownStore = useMarkdownStore()
const htmlContent = ref('')

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeHighlight)
  .use(rehypeStringify)

async function renderMarkdown(content) {
  if (!content.trim()) return ''
  try {
    const result = await processor.process(content)
    return String(result)
  } catch {
    return ''
  }
}

watch(
  () => markdownStore.content,
  async (content) => {
    htmlContent.value = await renderMarkdown(content)
  },
  { immediate: true }
)
</script>

<template>
  <div class="preview h-full overflow-y-auto">
    <div
      v-if="htmlContent"
      class="preview-content"
      v-html="htmlContent"
    />
    <div
      v-else
      class="preview-content flex items-center justify-center min-h-[200px] text-[var(--control-text-color)]"
    >
      <p>Start writing to see the preview...</p>
    </div>
  </div>
</template>
