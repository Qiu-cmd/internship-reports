<template>
  <div v-if="unlocked" class="min-h-screen bg-gray-900">
    <slot />
  </div>
  <div v-else class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 px-4">
    <div class="w-full max-w-sm text-center">
      <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15">
        <Lock class="h-8 w-8 text-blue-300" />
      </div>
      <h1 class="text-2xl font-black text-white">实习日报周报</h1>
      <p class="mt-2 text-sm text-gray-400">请输入访问密码</p>
      <div class="mt-6 space-y-3">
        <input
          v-model="password"
          type="password"
          class="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-center text-white placeholder-gray-500 outline-none transition focus:border-blue-500"
          placeholder="请输入密码"
          @keyup.enter="verify"
        />
        <button
          class="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
          @click="verify"
        >
          确 认
        </button>
        <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Lock } from 'lucide-vue-next'

const password = ref('')
const error = ref('')
const unlocked = ref(false)

const verify = () => {
  if (password.value === import.meta.env.VITE_ACCESS_PASSWORD) {
    unlocked.value = true
    sessionStorage.setItem('report_unlocked', '1')
    error.value = ''
  } else {
    error.value = '密码错误，请重试'
    password.value = ''
  }
}

if (sessionStorage.getItem('report_unlocked') === '1') {
  unlocked.value = true
}
</script>
