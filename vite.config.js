import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['mermaid']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
})
