<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePortfolioStore } from '../../store'

const store = usePortfolioStore()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.classList.add('menu-open')
  } else {
    document.body.classList.remove('menu-open')
  }
}

const closeMenu = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false
    document.body.classList.remove('menu-open')
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="logo">
        <router-link to="/" @click="closeMenu">
          <span class="name">Portfolio</span>
        </router-link>
      </div>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav :class="{ 'open': isMenuOpen }">
        <ul>
          <li><router-link to="/" @click="closeMenu">Home</router-link></li>
          <li><router-link to="/about" @click="closeMenu">About</router-link></li>
          <li><router-link to="/experience" @click="closeMenu">Experience</router-link></li>
          <li><router-link to="/projects" @click="closeMenu">Projects</router-link></li>
          <li><router-link to="/skills" @click="closeMenu">Skills</router-link></li>
          <li><router-link to="/contact" @click="closeMenu">Contact</router-link></li>
          <li><router-link to="/about-site" @click="closeMenu">About This Site</router-link></li>
        </ul>
        <button class="theme-toggle" @click="store.toggleTheme">
          <span v-if="store.theme === 'light'">🌙</span>
          <span v-else>☀️</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  background-color: rgba(var(--color-background), 0.9);
  backdrop-filter: blur(10px);
}

/* Dark mode specific styles */
:root[data-theme="dark"] header {
  background-color: rgba(18, 18, 18, 0.9);
}

header.scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
}

.logo a {
  text-decoration: none;
  color: var(--color-text);
}

.name {
  background: linear-gradient(90deg, #4a6cf7, #f86cf7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

nav {
  display: flex;
  align-items: center;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  margin-left: 1.5rem;
}

nav a {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

nav a:hover {
  color: var(--color-primary);
}

nav a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

nav a:hover::after,
nav a.router-link-active::after {
  width: 100%;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 24px;
  position: relative;
  z-index: 1001;
}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  position: absolute;
  left: 0;
  transition: all 0.3s ease;
}

.menu-toggle span:nth-child(1) {
  top: 0;
}

.menu-toggle span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.menu-toggle span:nth-child(3) {
  bottom: 0;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: var(--color-background);
    flex-direction: column;
    justify-content: center;
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }

  nav.open {
    right: 0;
  }

  nav ul {
    flex-direction: column;
    align-items: center;
  }

  nav li {
    margin: 1rem 0;
  }

  .theme-toggle {
    margin: 2rem 0 0 0;
  }

  body.menu-open {
    overflow: hidden;
  }

  .menu-toggle span:nth-child(1) {
    transform: rotate(45deg);
    top: 11px;
  }

  .menu-toggle span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle span:nth-child(3) {
    transform: rotate(-45deg);
    bottom: 11px;
  }
}
</style>
