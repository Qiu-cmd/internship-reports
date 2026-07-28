<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="mx-auto max-w-2xl px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-5">
      <!-- 顶部导航 -->
      <div class="flex items-center gap-2 sm:gap-3">
        <router-link to="/" class="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition shrink-0">
          <ArrowLeft class="h-4 w-4 sm:h-5 sm:w-5" />
        </router-link>
        <div class="min-w-0">
          <p class="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-purple-200">WEEKLY REPORT</p>
          <h1 class="text-base sm:text-xl font-black text-white truncate">{{ week?.title || '周报' }}</h1>
          <p v-if="week?.dateRange" class="text-[10px] sm:text-xs text-gray-500">{{ week.dateRange }}</p>
        </div>
      </div>

      <!-- 周报内容 -->
      <section v-if="week" class="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gray-800 p-4 sm:p-5 shadow-2xl shadow-black/25">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-purple-500/15 shrink-0">
            <BookOpen class="h-4 w-4 sm:h-5 sm:w-5 text-purple-300" />
          </div>
          <span class="text-sm sm:text-base font-bold text-white">第{{ week.id }}周 · {{ week.title }}</span>
        </div>
        <div class="text-sm sm:text-base">
          <MarkdownViewer :content="week.raw" />
        </div>
        <div v-if="week.tags.length" class="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 border-t border-white/10 pt-3 sm:pt-4">
          <span v-for="tag in week.tags" :key="tag" class="rounded-md sm:rounded-lg bg-purple-500/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-purple-300">{{ tag }}</span>
        </div>
      </section>

      <div v-else class="rounded-2xl bg-gray-800/30 px-4 py-16 text-center">
        <div class="mb-3 flex justify-center">
          <BookOpen class="h-10 w-10 text-gray-600" />
        </div>
        <p class="text-sm text-gray-400">周报未找到</p>
      </div>

      <!-- 关联日报 -->
      <section v-if="relatedDailyDates.length" class="space-y-3">
        <h2 class="text-xs sm:text-sm font-bold text-gray-300">关联日报</h2>
        <div class="grid grid-cols-3 gap-1.5 sm:gap-2 sm:grid-cols-5">
          <router-link
            v-for="d in relatedDailyDates"
            :key="d"
            :to="`/day/${d}`"
            class="rounded-lg sm:rounded-xl bg-gray-800/60 px-2 sm:px-3 py-1.5 sm:py-2 text-center text-[11px] sm:text-xs font-semibold text-gray-300 transition hover:bg-blue-600/20 hover:text-blue-300"
          >
            {{ formatShortDate(d) }}
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, BookOpen } from 'lucide-vue-next'
import MarkdownViewer from '@/components/MarkdownViewer.vue'
import { reportsByDate, weeklyReports } from '@/utils/reports'

const route = useRoute()
const weekId = computed(() => parseInt(route.params.id))

const week = computed(() => weeklyReports.value.find(w => w.id === weekId.value))

const relatedDailyDates = computed(() => {
  if (!week.value?.dateRange) return []
  const [start, end] = week.value.dateRange.split('~').map(s => s.trim())
  if (!start || !end) return []
  const allDates = [...reportsByDate.value.keys()].sort()
  return allDates.filter(d => d >= start && d <= end)
})

const formatShortDate = (ds) => {
  const [y, m, d] = ds.split('-')
  return `${parseInt(m)}/${parseInt(d)}`
}
</script>
