<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePortfolioStore } from '../../store'
import { useDisplay } from 'vuetify'

const store = usePortfolioStore()
const { mobile } = useDisplay()
const drawer = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const appBarElevation = computed(() => {
  return isScrolled.value ? 4 : 0
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial scroll position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- App Bar -->
  <v-app-bar 
    app 
    :elevation="appBarElevation" 
    color="transparent"
    class="px-2 header-blur"
  >
    <v-container class="d-flex align-center py-0 px-0 px-sm-2">
      <!-- Logo -->
      <router-link to="/" class="text-decoration-none">
        <v-toolbar-title class="font-weight-bold">
          <span class="gradient-text">Portfolio</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex">
        <v-btn 
          v-for="item in [
            { title: 'Home', to: '/' },
            { title: 'About', to: '/about' },
            { title: 'Experience', to: '/experience' },
            { title: 'Projects', to: '/projects' },
            { title: 'Skills', to: '/skills' },
            { title: 'Contact', to: '/contact' },
            { title: 'About This Site', to: '/about-site' }
          ]"
          :key="item.title"
          :to="item.to"
          variant="text"
          class="mx-1"
        >
          {{ item.title }}
        </v-btn>
      </div>

      <!-- Mobile Menu Button -->
      <v-app-bar-nav-icon 
        class="d-md-none" 
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    width="280"
  >
    <v-list>
      <v-list-item 
        v-for="item in [
          { title: 'Home', to: '/', icon: 'mdi-home' },
          { title: 'About', to: '/about', icon: 'mdi-account' },
          { title: 'Experience', to: '/experience', icon: 'mdi-briefcase' },
          { title: 'Projects', to: '/projects', icon: 'mdi-code-tags' },
          { title: 'Skills', to: '/skills', icon: 'mdi-star' },
          { title: 'Contact', to: '/contact', icon: 'mdi-email' },
          { title: 'About This Site', to: '/about-site', icon: 'mdi-information' }
        ]"
        :key="item.title"
        :to="item.to"
        @click="drawer = false"
        :prepend-icon="item.icon"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #4a6cf7, #f86cf7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.header-blur {
  backdrop-filter: blur(10px);
  background-color: rgba(18, 18, 18, 0.5) !important;
}
</style>
