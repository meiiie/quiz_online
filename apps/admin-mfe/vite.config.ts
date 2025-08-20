import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ Cấu hình server cho micro-frontend
  server: {
    port: 3001,
    host: true, // Cho phép truy cập từ bên ngoài
    cors: true, // Bật CORS cho micro-frontend
  },

  // ✅ Cấu hình preview (cho production build)
  preview: {
    port: 3001,
    host: true,
    cors: true,
  },

  // ✅ Thêm toàn bộ phần resolve.alias này vào
  resolve: {
    alias: {
      '@quiz-online': path.resolve('../../packages'),
    },
  },
})