import { computed } from 'vue'

const dailyModules = import.meta.glob('/content/daily/*.md', { as: 'raw', eager: true })
const weeklyModules = import.meta.glob('/content/weekly/*.md', { as: 'raw', eager: true })

function parseFrontmatter(raw) {
  // Unwrap Vite/Rolldown module object if needed
  const content = typeof raw === 'string' ? raw : (raw?.default || raw?.body || '')
  if (typeof content !== 'string') return { meta: {}, body: '' }
  // Normalize line endings (handle Windows CRLF)
  const normalized = content.replace(/\r\n/g, '\n')
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: normalized }
  const meta = {}
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) {
      let val = rest.join(':').trim()
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''))
      }
      meta[key.trim()] = val
    }
  })
  return { meta, body: match[2].trim() }
}

function extractSummary(body, length = 80) {
  const text = body.replace(/[#*`>\-\n\r]/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > length ? text.slice(0, length) + '...' : text
}

export const reportsByDate = computed(() => {
  const map = new Map()
  Object.entries(dailyModules).forEach(([path, raw]) => {
    // Unwrap Vite/Rolldown module wrapper if needed
    const source = typeof raw === 'string' ? raw : (raw?.default || raw?.body || String(raw))
    const { meta, body } = parseFrontmatter(source)
    const date = meta.date || path.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || ''
    const report = {
      date,
      type: 'daily',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      title: meta.title || extractSummary(body, 30),
      raw: source,
      body,
      summary: extractSummary(body)
    }
    if (!map.has(date)) map.set(date, [])
    map.get(date).push(report)
  })
  return map
})

export const weeklyReports = computed(() => {
  return Object.entries(weeklyModules).map(([path, raw]) => {
    // Unwrap Vite/Rolldown module wrapper if needed
    const source = typeof raw === 'string' ? raw : (raw?.default || raw?.body || String(raw))
    const { meta, body } = parseFrontmatter(source)
    const idMatch = path.match(/week-(\d+)/)
    return {
      id: meta.id || (idMatch ? parseInt(idMatch[1]) : 1),
      title: meta.title || '周报',
      dateRange: meta.dateRange || '',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      raw: source,
      body,
      summary: extractSummary(body)
    }
  }).sort((a, b) => b.id - a.id)
})

export function getWeekReportForDate(dateStr) {
  const date = new Date(dateStr)
  return weeklyReports.value.find(w => {
    if (!w.dateRange) return false
    const [start, end] = w.dateRange.split('~').map(s => s.trim())
    if (!start || !end) return false
    return new Date(start) <= date && date <= new Date(end)
  })
}
