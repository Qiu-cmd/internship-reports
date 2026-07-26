<template>
  <div class="space-y-3">
    <label
      class="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-600 bg-gray-900/40 px-4 py-8 text-center transition hover:border-blue-500/60"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <input type="file" accept=".docx" class="hidden" @change="handleFile" ref="inputRef" />
      <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800">
        <Upload class="h-6 w-6 text-gray-400" />
      </div>
      <span class="mt-3 text-sm font-semibold text-gray-300">拖拽或点击上传 docx</span>
      <span class="mt-1 text-xs text-gray-500">自动解析为 Markdown</span>
    </label>

    <div v-if="parsing" class="text-center text-sm text-gray-400">解析中...</div>

    <div v-if="result" class="space-y-3">
      <div class="rounded-2xl bg-gray-900/60 p-4 max-h-64 overflow-y-auto">
        <pre class="text-xs text-gray-300 whitespace-pre-wrap">{{ result }}</pre>
      </div>
      <div class="flex gap-2">
        <button
          class="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-bold text-white hover:bg-blue-500 transition"
          @click="copyResult"
        >
          <Copy class="h-4 w-4 inline mr-1" />复制 Markdown
        </button>
        <button
          class="rounded-xl bg-gray-700 px-4 py-2 text-sm font-bold text-gray-100 hover:bg-gray-600 transition"
          @click="clearResult"
        >
          清除
        </button>
      </div>
      <p v-if="copied" class="text-xs text-green-400 text-center">已复制到剪贴板！</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload, Copy } from 'lucide-vue-next'
import { parseDocxFile } from '@/utils/parseDocx'

const inputRef = ref(null)
const parsing = ref(false)
const result = ref('')
const copied = ref(false)

const handleFile = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  await processFile(file)
}

const handleDrop = async (e) => {
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  await processFile(file)
}

const processFile = async (file) => {
  if (!file.name.endsWith('.docx')) return
  parsing.value = true
  result.value = ''
  try {
    const parsed = await parseDocxFile(file)
    result.value = parsed.markdown
  } catch (err) {
    result.value = `解析失败：${err.message}`
  }
  parsing.value = false
}

const copyResult = async () => {
  await navigator.clipboard.writeText(result.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const clearResult = () => {
  result.value = ''
}
</script>
