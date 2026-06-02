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
    // 1. Increase chunk size warning limit if needed
    chunkSizeWarningLimit: 600, 
    rollupOptions: {
      output: {
        // 2. Control exactly how code splits into smaller files
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Put React and Vue in separate vendor chunks so they cache individually
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('vue')) return 'vendor-vue';
            // Put other libraries into a general vendor chunk
            return 'vendor-libs';
          }
        }
      }
    }
  },
  base: './',
})
