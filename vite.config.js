import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Check if local-only admin portal files exist on disk
const hasAdminPortal = fs.existsSync(path.resolve(__dirname, 'src/pages/Admin.jsx'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // If admin portal is gitignored or missing in production CI/CD, safely alias to NotFound
      '@admin-portal': hasAdminPortal
        ? path.resolve(__dirname, 'src/pages/Admin.jsx')
        : path.resolve(__dirname, 'src/pages/NotFound.jsx'),
    },
  },
})
