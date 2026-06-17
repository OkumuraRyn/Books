import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  base: '/Books/',
  plugins: [vue(), svgLoader()],
  esbuild: {
    target: 'es2022'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2022'
    }
  },
  build: {
    target: 'es2022'
  }
})
