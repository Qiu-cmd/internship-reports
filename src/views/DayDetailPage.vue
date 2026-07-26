<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="mx-auto max-w-2xl px-4 py-6 space-y-5">
      <div class="flex items-center gap-3">
        <router-link to="/" class="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition">
          <ArrowLeft class="h-5 w-5" />
        </router-link>
        <div>
          <p class="text-xs font-semibold tracking-[0.3em] text-blue-200">DAILY REPORT</p>
          <h1 class="text-xl font-black text-white">{{ readableDate }}</h1>
        </div>
      </div>

      <template v-if="reports.length">
        <section v-for="r in reports" :key="r.date + r.title" class="rounded-3xl border border-white/10 bg-gray-800 p-5 shadow-2xl shadow-black/25">
          <div class="flex items-center gap-3 mb-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
              <FileText class="h-5 w-5 text-blue-300" />
            </div>
            <span class="font-bold text-white">{{ r.title }}</span>
          </div>
          <MarkdownViewer :content="r.raw" />
          <div v-if="r.tags.length" class="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            <span v-for="tag in r.tags" :key="tag" class="rounded-lg bg-blue-500/10 px-3 py-1 text-xs text-blue-300">{{ tag }}</span>
          </div>
        </section>
      </template>

      <div v-else class="rounded-2xl bg-gray-800/30 px-4 py-16 text-center">
        <p class="text-sm text-gray-400">该日期暂无日报</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, FileText } from 'lucide-vue-next'
import MarkdownViewer from '@/components/MarkdownViewer.vue'
import { reportsByDate } from '@/utils/reports'

const route = useRoute()
const date = computed(() => route.params.date)

const reports = computed(() => reportsByDate.value.get(date.value) || [])

const readableDate = computed(() => {
  const d = new Date(date.value)
  const weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${weekNames[d.getDay()]}`
})
</script>
