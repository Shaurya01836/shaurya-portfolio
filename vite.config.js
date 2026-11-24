/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Check if local-only admin portal files exist on disk
const hasAdminPortal = fs.existsSync(path.resolve(__dirname, 'src/pages/Admin.jsx'))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const shareId = env.UMAMI_SHARE_ID || 'UyzK9wHBN84hUbvy'

  return {
    plugins: [
      react(),
      {
        name: 'api-stats-local-dev',
        configureServer(server) {
          server.middlewares.use('/api/stats', async (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')

            try {
              const shareRes = await fetch(
                `https://cloud.umami.is/analytics/us/api/share/${shareId}`,
                { headers: { Accept: 'application/json' } }
              )
              if (!shareRes.ok) throw new Error('Share fetch failed')
              const shareData = await shareRes.json()

              const headers = {
                'x-umami-share-token': shareData.token,
                'x-umami-share-context': shareData.shareId,
                Accept: 'application/json',
              }

              const now = Date.now()
              const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000

              const [sevenDayRes, allTimeRes, activeRes, pageviewsRes] =
                await Promise.allSettled([
                  fetch(
                    `https://cloud.umami.is/analytics/us/api/websites/${shareData.websiteId}/stats?startAt=${sevenDaysAgo}&endAt=${now}`,
                    { headers }
                  ),
                  fetch(
                    `https://cloud.umami.is/analytics/us/api/websites/${shareData.websiteId}/stats?startAt=0&endAt=${now}`,
                    { headers }
                  ),
                  fetch(
                    `https://cloud.umami.is/analytics/us/api/websites/${shareData.websiteId}/active`,
                    { headers }
                  ),
                  fetch(
                    `https://cloud.umami.is/analytics/us/api/websites/${shareData.websiteId}/pageviews?startAt=${sevenDaysAgo}&endAt=${now}&unit=day`,
                    { headers }
                  ),
                ])

              let sevenDaysViews = 0
              let sevenDaysVisitors = 0
              let totalViews = 0
              let totalVisitors = 0
              let active = 1
              let dailyViews = []

              if (sevenDayRes.status === 'fulfilled' && sevenDayRes.value.ok) {
                const data = await sevenDayRes.value.json()
                sevenDaysViews = data.pageviews?.value ?? data.pageviews ?? 0
                sevenDaysVisitors = data.visitors?.value ?? data.visitors ?? 0
              }

              if (allTimeRes.status === 'fulfilled' && allTimeRes.value.ok) {
                const data = await allTimeRes.value.json()
                totalViews = data.pageviews?.value ?? data.pageviews ?? 0
                totalVisitors = data.visitors?.value ?? data.visitors ?? 0
              }

              if (activeRes.status === 'fulfilled' && activeRes.value.ok) {
                const data = await activeRes.value.json()
                active = data.visitors ?? data.x ?? 1
              }

              if (pageviewsRes.status === 'fulfilled' && pageviewsRes.value.ok) {
                const data = await pageviewsRes.value.json()
                dailyViews = data.pageviews || []
              }

              return res.end(
                JSON.stringify({
                  configured: true,
                  sevenDaysViews,
                  sevenDaysVisitors,
                  totalViews,
                  totalVisitors,
                  active,
                  dailyViews,
                  shareId,
                  isLocalDev: true,
                })
              )
            } catch (err) {
              return res.end(
                JSON.stringify({
                  configured: false,
                  sevenDaysViews: null,
                  sevenDaysVisitors: null,
                  totalViews: null,
                  totalVisitors: null,
                  active: null,
                  dailyViews: [],
                  error: err.message,
                })
              )
            }
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@admin-portal': hasAdminPortal
          ? path.resolve(__dirname, 'src/pages/Admin.jsx')
          : path.resolve(__dirname, 'src/pages/NotFound.jsx'),
      },
    },
  }
})
