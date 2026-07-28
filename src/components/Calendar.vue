<template>
  <div class="select-none">
    <div class="mb-3 sm:mb-4 flex items-center justify-between">
      <button class="rounded-lg p-1.5 sm:p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition" @click="prevMonth">
        <ChevronLeft class="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <span class="text-base sm:text-lg font-black text-white">{{ year }}年{{ month }}月</span>
      <button class="rounded-lg p-1.5 sm:p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition" @click="nextMonth">
        <ChevronRight class="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>

    <div class="mb-1 sm:mb-2 grid grid-cols-7 text-center">
      <span v-for="d in weekDays" :key="d" class="text-[10px] sm:text-xs font-semibold text-gray-500 py-1">{{ d }}</span>
    </div>

    <div class="grid grid-cols-7 text-center">
      <div v-for="i in startDay" :key="'empty-' + i" class="aspect-square" />

      <button
        v-for="day in daysInMonth"
        :key="day"
        type="button"
        class="relative flex aspect-square items-center justify-center rounded-lg sm:rounded-xl text-[13px] sm:text-sm font-bold transition active:scale-95"
        :class="dayClass(day)"
        @click="selectDay(day)"
      >
        {{ day }}
        <span
          v-if="markedDates.has(dateString(day))"
          class="absolute bottom-0.5 sm:bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-400"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  markedDates: { type: Set, default: () => new Set() },
  modelValue: { type: String, default: null }
})

const emit = defineEmits(['update:modelValue', 'select'])

const weekDays = ['一', '二', '三', '四', '五', '六', '日']

const today = new Date()
const viewDate = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const year = computed(() => viewDate.value.getFullYear())
const month = computed(() => viewDate.value.getMonth() + 1)

const startDay = computed(() => {
  const d = new Date(year.value, month.value - 1, 1).getDay()
  return d === 0 ? 6 : d - 1
})

const daysInMonth = computed(() => {
  return new Date(year.value, month.value, 0).getDate()
})

const dateString = (day) => {
  const y = year.value
  const m = String(month.value).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const isToday = (day) => {
  const ds = dateString(day)
  const ty = today.getFullYear()
  const tm = String(today.getMonth() + 1).padStart(2, '0')
  const td = String(today.getDate()).padStart(2, '0')
  return ds === `${ty}-${tm}-${td}`
}

const isSelected = (day) => {
  return props.modelValue === dateString(day)
}

const dayClass = (day) => {
  const classes = []
  if (isSelected(day)) classes.push('bg-blue-600 text-white shadow-lg shadow-blue-900/30')
  else if (isToday(day)) classes.push('border-2 border-blue-500 text-blue-300')
  else classes.push('text-gray-300 hover:bg-gray-800')
  return classes.join(' ')
}

const selectDay = (day) => {
  const ds = dateString(day)
  emit('update:modelValue', ds)
  emit('select', ds)
}

const prevMonth = () => {
  viewDate.value = new Date(year.value, month.value - 2, 1)
}

const nextMonth = () => {
  viewDate.value = new Date(year.value, month.value, 1)
}
</script>
