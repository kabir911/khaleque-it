import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// IMPORTANT: For GitHub Pages project sites the site is served from
//   https://<user>.github.io/<repo>/
// Set `base` to "/<repo>/" (with leading & trailing slash).
// If you deploy to a user/organization page (https://<user>.github.io/) or a
// custom domain, change base back to '/'.
export default defineConfig({
  plugins: [
    react(),
    vue({
      template: {
        compilerOptions: {
          // Treat any tag starting with 'embedded-' as a native custom element
          isCustomElement: (tag) => tag.startsWith('embedded-')
        }
      }
    })
  ],
  base: './',
})
