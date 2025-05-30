import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vuetify from 'vite-plugin-vuetify'
import importMapPlugin from './vite.importmap.plugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/Portfolio/', // Base URL for GitHub Pages
  plugins: [
    vue(),
    vueDevTools(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    vuetify({
      autoImport: true, // Auto import Vuetify components
      styles: { configFile: 'src/assets/styles/vuetify-settings.scss' }
    }),
    // Add custom import map plugin for production builds
    mode === 'production' && importMapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  optimizeDeps: {
    include: ['vuetify']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure all dependencies are properly bundled for production
    // This is essential for GitHub Pages deployment to avoid bare specifier errors
    rollupOptions: {
      output: {
        // Ensure proper code splitting with explicit names for import map resolution
        manualChunks: (id) => {
          if (id.includes('node_modules/vue/') || id.includes('node_modules/vue-router/')) {
            return 'vue';
          }
          if (id.includes('node_modules/pinia/')) {
            return 'pinia';
          }
          if (id.includes('node_modules/vuetify/')) {
            return 'vuetify';
          }
        },
        // Ensure proper module format for browser compatibility
        format: 'es',
        // Use static filenames without hash for import map consistency
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js'
      },
      // Explicitly include all dependencies to ensure they're bundled
      external: []
    },
    // Use proper module format for browser compatibility
    target: 'esnext',
    // Ensure all modules are fully bundled
    modulePreload: {
      polyfill: true
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
}))
