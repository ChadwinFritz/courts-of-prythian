import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { webfontDownload } from 'vite-plugin-webfont-dl'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/courts-of-prythian/' : '/',
  plugins: [
    vue(),
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap',
      'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap',
    ]),
  ],
})
