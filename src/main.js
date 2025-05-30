import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
// Import all from vuetify instead of separate imports
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import App from './App.vue'
import router from './router'

// Import Vuetify styles - use full path to avoid bare specifier issues
import './assets/vuetify-styles.css' // This will be a copy of Vuetify styles
import '@mdi/font/css/materialdesignicons.css'

// Configure Vuetify with all necessary components and directives
const vuetify = createVuetify({
  components,
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
