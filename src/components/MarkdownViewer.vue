<template>
  <div class="prose prose-invert prose-sm max-w-none" v-html="rendered" />
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'

marked.setOptions({ breaks: true })

const props = defineProps({ content: { type: String, required: true } })

const rendered = computed(() => {
  const normalized = props.content.replace(/\r\n/g, '\n')
  const body = normalized.replace(/^---[\s\S]*?---\n*/, '')
  return marked.parse(body)
})
</script>

<style scoped>
.prose h1 { font-size: 1.5rem; font-weight: 900; color: #fff; margin: 1.5rem 0 0.75rem; }
.prose h2 { font-size: 1.2rem; font-weight: 800; color: #93c5fd; margin: 1.25rem 0 0.5rem; }
.prose h3 { font-size: 1rem; font-weight: 700; color: #e2e8f0; margin: 1rem 0 0.5rem; }
.prose p { color: #d1d5db; line-height: 1.8; margin: 0.75rem 0; }
.prose ul, .prose ol { color: #d1d5db; padding-left: 1.5rem; margin: 0.5rem 0; }
.prose li { margin: 0.25rem 0; }
.prose strong { color: #fff; }
.prose code { background: #1f2937; color: #fbbf24; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875em; }
.prose pre { background: #111827; padding: 1rem; border-radius: 0.75rem; overflow-x: auto; }
.prose pre code { background: none; color: #e2e8f0; padding: 0; }
</style>
