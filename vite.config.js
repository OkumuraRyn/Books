import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-plugin-svg-loader'

export default defineConfig({
  base: 'Books',  // 替换为你的仓库名
  plugins: [vue(), svgLoader()]
})
