<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from './store'
import { useTheme } from 'vuetify'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import BackgroundAnimation from './components/animations/BackgroundAnimation.vue'

const store = usePortfolioStore()
const theme = useTheme()

onMounted(() => {
  // Always set theme to dark
  theme.global.name.value = 'dark'
})
</script>

<template>
  <v-app theme="dark">
    <BackgroundAnimation />
    <TheHeader />
    
    <v-main :style="{ position: 'relative', zIndex: 1 }">
      <router-view v-slot="{ Component }">
        <v-fade-transition mode="out-in">
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>
    
    <TheFooter />
  </v-app>
</template>

<style>
/* Global CSS Variables - Synchronized with Vuetify theme */
:root {
  --color-primary: #4a6cf7;
  --color-secondary: #f86cf7;
  --color-accent: #6c7bfa;
  --color-error: #e74c3c;
  --color-warning: #f39c12;
  --color-info: #1abc9c;
  --color-success: #2ecc71;
  
  /* Dark theme variables as default */
  --color-background: #121212;
  --color-background-soft: #1e1e1e;
  --color-background-mute: #2c2c2c;
  
  --color-text: #ffffff;
  --color-text-light: rgba(235, 235, 235, 0.64);
  
  --color-border: rgba(84, 84, 84, 0.48);
  --color-border-hover: rgba(84, 84, 84, 0.65);
  
  --section-gap: 160px;
  --section-gap-half: 80px;
  
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Dark theme is now handled by Vuetify */

/* Base styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  overflow-x: hidden;
}

body {
  min-height: 100vh;
  width: 100%;
  color: var(--color-text);
  background: var(--color-background);
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: var(--font-family);
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* App container */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* Main content */
.main-content {
  flex: 1;
  width: 100%; /* Use percentage instead of viewport width */
  max-width: 100%; /* Ensure it doesn't exceed the container */
  margin: 0;
  padding: 80px 0 0; /* Account for fixed header */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

/* Ensure all sections take full width */
.main-content > * {

  padding: 0 2rem;
  box-sizing: border-box;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Section styling */
.section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #4a6cf7, #f86cf7);
  border-radius: 2px;
}

/* Button styles */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.btn-primary {
  background: linear-gradient(90deg, #4a6cf7, #f86cf7);
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.btn-secondary:hover {
  background-color: var(--color-primary);
  color: white;
}

/* Card styles */
.card {
  background-color: var(--color-background);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

/* Responsive utilities */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .section {
    padding: 3rem 0;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .section {
    padding: 2rem 0;
  }
}
</style>
