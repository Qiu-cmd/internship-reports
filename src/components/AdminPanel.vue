<template>
  <div class="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="w-full max-w-md rounded-3xl border border-white/10 bg-gray-800 p-5 shadow-2xl shadow-black/40 space-y-4 max-h-[90vh] overflow-y-auto scroll-content">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-black text-white">管理模式</h2>
        <button class="text-gray-400 hover:text-white transition" @click="$emit('close')">
          <X class="h-5 w-5" />
        </button>
      </div>

      <div>
        <h3 class="text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
          <Upload class="h-4 w-4 text-blue-300" />上传 docx 日报
        </h3>
        <DocxUploader />
      </div>

      <div class="rounded-2xl bg-gray-900/60 p-4">
        <h3 class="text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
          <Pencil class="h-4 w-4 text-blue-300" />在线编辑
        </h3>
        <p class="text-xs text-gray-400 leading-5">
          直接编辑下方的 Markdown 文本，完成后点击「复制」粘贴到本地 <code class="bg-gray-700 px-1 rounded text-yellow-300">.md</code> 文件，放入 <code class="bg-gray-700 px-1 rounded text-yellow-300">content/daily/</code> 目录。
        </p>
      </div>

      <div class="rounded-2xl bg-blue-500/10 p-4">
        <h3 class="text-sm font-bold text-blue-300 mb-2">文件命名规则</h3>
        <p class="text-xs text-blue-200/80 leading-5">
          日报：<code class="bg-blue-900/40 px-1 rounded">content/daily/YYYY-MM-DD.md</code><br/>
          周报：<code class="bg-blue-900/40 px-1 rounded">content/weekly/week-NN.md</code><br/>
          Frontmatter 需包含 <code>date</code>（日报）或 <code>dateRange</code>（周报）
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, Upload, Pencil } from 'lucide-vue-next'
import DocxUploader from './DocxUploader.vue'

defineEmits(['close'])
</script>
