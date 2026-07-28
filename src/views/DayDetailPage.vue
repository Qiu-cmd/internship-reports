<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="mx-auto max-w-2xl px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-5">
      <!-- 顶部导航 -->
      <div class="flex items-center gap-2 sm:gap-3">
        <router-link to="/" class="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition shrink-0">
          <ArrowLeft class="h-4 w-4 sm:h-5 sm:w-5" />
        </router-link>
        <div class="min-w-0">
          <p class="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-blue-200">DAILY REPORT</p>
          <h1 class="text-base sm:text-xl font-black text-white truncate">{{ readableDate }}</h1>
        </div>
      </div>

      <!-- 日报内容 -->
      <template v-if="reports.length">
        <section v-for="r in reports" :key="r.date + r.title" class="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gray-800 p-4 sm:p-5 shadow-2xl shadow-black/25">
          <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-blue-500/15 shrink-0">
              <FileText class="h-4 w-4 sm:h-5 sm:w-5 text-blue-300" />
            </div>
            <span class="text-sm sm:text-base font-bold text-white truncate">{{ r.title }}</span>
          </div>
          <div class="text-sm sm:text-base">
            <MarkdownViewer :content="r.raw" />
          </div>
          <div v-if="r.tags.length" class="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 border-t border-white/10 pt-3 sm:pt-4">
            <span v-for="tag in r.tags" :key="tag" class="rounded-md sm:rounded-lg bg-blue-500/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-blue-300">{{ tag }}</span>
          </div>
        </section>
      </template>

      <!-- 空状态 -->
      <div v-else class="rounded-2xl bg-gray-800/30 px-4 py-16 text-center">
        <div class="mb-3 flex justify-center">
          <FileText class="h-10 w-10 text-gray-600" />
        </div>
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
