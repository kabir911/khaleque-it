import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
import progress from 'vite-plugin-progress';

// https://vitejs.dev/config/
// IMPORTANT: For GitHub Pages project sites the site is served from
//   https://<user>.github.io/<repo>/
// Set `base` to "/<repo>/" (with leading & trailing slash).
// If you deploy to a user/organization page (https://<user>.github.io/) or a
// custom domain, change base back to '/'.
export default defineConfig({
  plugins: [
    progress(),
    react(),
    vue({
      template: {
        compilerOptions: {
          // Treat any tag starting with 'embedded-' as a native custom element
          isCustomElement: (tag) => tag.startsWith('embedded-')
        }
      }
    }),
  //    visualizer({
  //      open: true, // Automatically opens the browser report after building
  //      filename: 'bundle-analysis.html',
  //      gzipSize: true,
  //    brotliSize: true,})
  ],
  resolve: {
    alias: {
      // This intercepts React imports and points them to ultra-light Preact
      'react': 'preact/compat',
      'react-dom/test-utils': 'preact/compat/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  },   
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'], // Completely deletes standard logs
      },
      mangle: true, // Renames functions/variables to single letters      
    },
  },  
  base: './',
})
