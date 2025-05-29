import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
// Remove the deprecated components import
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import App from './App.vue'
import router from './router'

// Import Vuetify styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Configure Vuetify - removed components property to fix deprecation warning
const vuetify = createVuetify({
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#4a6cf7',    // Blue
          secondary: '#f86cf7',  // Pink
          accent: '#6c7bfa',     // Purple
          error: '#e74c3c',      // Red
          warning: '#f39c12',    // Orange
          info: '#1abc9c',       // Teal
          success: '#2ecc71',    // Green
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#4a6cf7',    // Blue
          secondary: '#f86cf7',  // Pink
          accent: '#6c7bfa',     // Purple
          error: '#e74c3c',      // Red
          warning: '#f39c12',    // Orange
          info: '#1abc9c',       // Teal
          success: '#2ecc71',    // Green
        }
      }
    }
  }
})

// Create the app instance
const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router
app.use(router)

// Use Vuetify
app.use(vuetify)

// Mount the app
app.mount('#app')
