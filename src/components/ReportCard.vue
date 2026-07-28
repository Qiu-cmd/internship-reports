<template>
  <div
    class="group cursor-pointer rounded-xl sm:rounded-2xl border border-white/10 bg-gray-800/80 p-3 sm:p-4 transition hover:border-blue-500/40 hover:bg-gray-800 active:scale-[0.98]"
    @click="$emit('click')"
  >
    <div class="flex items-start gap-2 sm:gap-3">
      <div class="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl"
        :class="report.type === 'weekly' ? 'bg-purple-500/15' : 'bg-blue-500/15'"
      >
        <component :is="report.type === 'weekly' ? BookOpen : FileText" class="h-4 w-4 sm:h-5 sm:w-5"
          :class="report.type === 'weekly' ? 'text-purple-300' : 'text-blue-300'"
        />
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-1.5 sm:gap-2">
          <span class="text-[13px] sm:text-sm font-bold text-white truncate">{{ report.title }}</span>
          <span class="shrink-0 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold"
            :class="report.type === 'weekly' ? 'bg-purple-500/15 text-purple-200' : 'bg-blue-500/15 text-blue-200'"
          >
            {{ report.type === 'weekly' ? '周报' : '日报' }}
          </span>
        </div>
        <p v-if="showDate && report.date" class="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">{{ formatDate(report.date) }}</p>
        <p class="mt-1.5 sm:mt-2 text-[11px] sm:text-xs leading-5 text-gray-400 line-clamp-2">{{ report.summary }}</p>
        <div v-if="report.tags.length" class="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-1.5">
          <span v-for="tag in report.tags" :key="tag" class="rounded-md sm:rounded-lg bg-gray-700/50 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs text-gray-400">{{ tag }}</span>
        </div>
      </div>
      <ChevronRight class="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gray-600 group-hover:text-blue-400 transition self-center" />
    </div>
  </div>
</template>

<script setup>
import { FileText, BookOpen, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  report: { type: Object, required: true },
  showDate: { type: Boolean, default: false }
})

defineEmits(['click'])

const formatDate = (ds) => {
  if (!ds) return ''
  const [y, m, d] = ds.split('-')
  return `${parseInt(m)}月${parseInt(d)}日`
}
</script>
