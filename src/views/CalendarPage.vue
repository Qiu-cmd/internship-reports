<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="mx-auto max-w-2xl px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-5">
      <!-- 标题栏 -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-blue-200">INTERNSHIP LOG</p>
          <h1 class="mt-0.5 sm:mt-1 text-lg sm:text-2xl font-black text-white">实习日报周报</h1>
        </div>
        <button
          class="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition shrink-0"
          @click="toggleAdmin"
          title="管理"
        >
          <Settings class="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <!-- 日历 -->
      <section class="rounded-2xl sm:rounded-3xl border border-white/10 bg-gray-800 p-3 sm:p-5 shadow-2xl shadow-black/25">
        <Calendar v-model="selectedDate" :marked-dates="allMarkedDates" @select="handleDateSelect" />
      </section>

      <!-- 选中日期内容 -->
      <section v-if="selectedDate" class="space-y-2 sm:space-y-3">
        <h2 class="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-gray-300">
          <span class="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500" />
          {{ formatReadableDate(selectedDate) }}
        </h2>

        <template v-if="dailyReportsForDate.length > 0">
          <ReportCard
            v-for="r in dailyReportsForDate"
            :key="r.date + r.title"
            :report="r"
            @click="goDayDetail(r.date)"
          />
        </template>
        <div v-else class="rounded-xl sm:rounded-2xl bg-gray-800/50 px-4 py-6 sm:py-8 text-center text-xs sm:text-sm text-gray-500">
          该日期暂无日报
        </div>

        <template v-if="weekReportForDate">
          <h2 class="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-gray-300 pt-2">
            <span class="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-purple-500" />
            所属周报
          </h2>
          <ReportCard
            :report="weekReportForDate"
            @click="goWeekDetail(weekReportForDate.id)"
          />
        </template>
      </section>

      <!-- 初始引导 -->
      <section v-else class="rounded-2xl bg-gray-800/30 px-4 py-12 sm:py-16 text-center">
        <div class="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gray-800/60">
          <CalendarDays class="h-6 w-6 sm:h-8 sm:w-8 text-gray-500" />
        </div>
        <p class="text-sm font-semibold text-gray-400">点击日历上的日期</p>
        <p class="mt-1 text-xs text-gray-500">查看当天的日报和周报</p>
      </section>
    </div>

    <AdminPanel v-if="adminMode" @close="adminMode = false" :date="selectedDate" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Settings, CalendarDays } from 'lucide-vue-next'
import Calendar from '@/components/Calendar.vue'
import ReportCard from '@/components/ReportCard.vue'
import AdminPanel from '@/components/AdminPanel.vue'
import { reportsByDate, weeklyReports, getWeekReportForDate } from '@/utils/reports'

const router = useRouter()
const selectedDate = ref(null)
const adminMode = ref(false)

const allMarkedDates = computed(() => new Set(reportsByDate.value.keys()))

const dailyReportsForDate = computed(() => {
  if (!selectedDate.value) return []
  return reportsByDate.value.get(selectedDate.value) || []
})

const weekReportForDate = computed(() => {
  if (!selectedDate.value) return null
  return getWeekReportForDate(selectedDate.value)
})

const handleDateSelect = (date) => {
  selectedDate.value = date
}

const formatReadableDate = (ds) => {
  const date = new Date(ds)
  const weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${weekNames[date.getDay()]}`
}

const goDayDetail = (date) => {
  router.push(`/day/${date}`)
}

const goWeekDetail = (id) => {
  router.push(`/week/${id}`)
}

const toggleAdmin = () => {
  adminMode.value = !adminMode.value
}
</script>
