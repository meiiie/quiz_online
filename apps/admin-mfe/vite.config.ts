import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ✅ Thêm import path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ Thêm toàn bộ phần resolve.alias này vào
  resolve: {
    alias: {
      '@quiz-online': path.resolve(__dirname, '../../packages'),
    },
  },
})