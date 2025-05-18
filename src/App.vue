<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from './store'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import BackgroundAnimation from './components/animations/BackgroundAnimation.vue'

const store = usePortfolioStore()

onMounted(() => {
  // Set initial theme based on user preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDarkMode) {
    store.theme = 'dark'
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
  }
})
</script>

<template>
  <div class="app" :class="{ 'dark-theme': store.theme === 'dark' }">
    <BackgroundAnimation />
    <TheHeader />
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <TheFooter />
  </div>
</template>

<style>
/* Global CSS Variables */
:root {
  --color-primary: #4a6cf7;
  --color-secondary: #f86cf7;
  --color-accent: #6c7bfa;
  
  --color-background: #ffffff;
  --color-background-soft: #f8f9fa;
  --color-background-mute: #f1f1f1;
  
  --color-text: #2c3e50;
  --color-text-light: #6c757d;
  
  --color-border: #e5e7eb;
  --color-border-hover: #d1d5db;
  
  --section-gap: 160px;
  --section-gap-half: 80px;
  
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Dark theme variables */
[data-theme="dark"] {
  --color-background: #121212;
  --color-background-soft: #1e1e1e;
  --color-background-mute: #2c2c2c;
  
  --color-text: #f1f1f1;
  --color-text-light: #a0a0a0;
  
  --color-border: #2c2c2c;
  --color-border-hover: #3f3f3f;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

/* Base styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
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
  display: flex;
  justify-content: center;
}

/* App container */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Main content */
.main-content {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 2rem 0; /* Account for fixed header and add horizontal padding */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Ensure all sections take full width */
.main-content > * {
  width: 100%;
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
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
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
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
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
