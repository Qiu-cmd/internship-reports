import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'calendar',
    component: () => import('../views/CalendarPage.vue')
  },
  {
    path: '/day/:date',
    name: 'day-detail',
    component: () => import('../views/DayDetailPage.vue')
  },
  {
    path: '/week/:id',
    name: 'week-detail',
    component: () => import('../views/WeekDetailPage.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})
