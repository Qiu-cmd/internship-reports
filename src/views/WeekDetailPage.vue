<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="mx-auto max-w-2xl px-4 py-6 space-y-5">
      <div class="flex items-center gap-3">
        <router-link to="/" class="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition">
          <ArrowLeft class="h-5 w-5" />
        </router-link>
        <div>
          <p class="text-xs font-semibold tracking-[0.3em] text-purple-200">WEEKLY REPORT</p>
          <h1 class="text-xl font-black text-white">{{ week?.title || '周报' }}</h1>
          <p v-if="week?.dateRange" class="text-xs text-gray-500">{{ week.dateRange }}</p>
        </div>
      </div>

      <section v-if="week" class="rounded-3xl border border-white/10 bg-gray-800 p-5 shadow-2xl shadow-black/25">
        <div class="flex items-center gap-3 mb-4">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15">
            <BookOpen class="h-5 w-5 text-purple-300" />
          </div>
          <span class="font-bold text-white">第{{ week.id }}周 · {{ week.title }}</span>
        </div>
        <MarkdownViewer :content="week.raw" />
        <div v-if="week.tags.length" class="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          <span v-for="tag in week.tags" :key="tag" class="rounded-lg bg-purple-500/10 px-3 py-1 text-xs text-purple-300">{{ tag }}</span>
        </div>
      </section>

      <div v-else class="rounded-2xl bg-gray-800/30 px-4 py-16 text-center">
        <p class="text-sm text-gray-400">周报未找到</p>
      </div>

      <section v-if="relatedDailyDates.length" class="space-y-3">
        <h2 class="text-sm font-bold text-gray-300">关联日报</h2>
        <div class="grid grid-cols-3 gap-2 sm:grid-cols-5">
          <router-link
            v-for="d in relatedDailyDates"
            :key="d"
            :to="`/day/${d}`"
            class="rounded-xl bg-gray-800/60 px-3 py-2 text-center text-xs font-semibold text-gray-300 transition hover:bg-blue-600/20 hover:text-blue-300"
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
