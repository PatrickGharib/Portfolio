<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/patrickgharib', icon: 'mdi-github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/patrick-a-b6b810162/', icon: 'mdi-linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/patrickgharib', icon: 'mdi-twitter' },
  { name: 'Email', url: 'mailto:patrick.a.gharib@gmail.com', icon: 'mdi-email' }
]

const navLinks = [
  { title: 'Home', to: '/' },
  { title: 'About', to: '/about' },
  { title: 'Experience', to: '/experience' },
  { title: 'Projects', to: '/projects' },
  { title: 'Skills', to: '/skills' },
  { title: 'Contact', to: '/contact' }
]
</script>

<template>
  <v-footer class="footer-bg mt-16">
    <v-container>
      <v-row class="mt-8 mb-6">
        <!-- Logo Column -->
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <router-link to="/" class="text-decoration-none">
            <span class="text-h5 font-weight-bold gradient-text">Portfolio</span>
          </router-link>
          <p class="text-body-2 text-medium-emphasis mt-2">Lead Software Developer</p>
        </v-col>
        
        <!-- Quick Links Column -->
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <h3 class="text-subtitle-1 font-weight-bold mb-4 pb-2 position-relative underline">
            Quick Links
          </h3>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item 
              v-for="link in navLinks" 
              :key="link.title" 
              :to="link.to"
              density="compact"
              class="px-0"
              color="primary"
            >
              <v-list-item-title class="text-body-2">
                {{ link.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        
        <!-- Social Links Column -->
        <v-col cols="12" md="4">
          <h3 class="text-subtitle-1 font-weight-bold mb-4 pb-2 position-relative underline">
            Connect
          </h3>
          <div class="d-flex flex-wrap gap-2">
            <v-btn
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="link.name"
              icon
              variant="flat"
              size="small"
              class="mr-2"
            >
              <v-icon>{{ link.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      
      <!-- Footer Bottom -->
      <v-divider></v-divider>
      
      <v-row class="py-4">
        <v-col cols="12" sm="6" class="text-center text-sm-left">
          <span class="text-body-2 text-medium-emphasis">
            &copy; {{ currentYear }} Portfolio. All rights reserved.
          </span>
        </v-col>
        <v-col cols="12" sm="6" class="text-center text-sm-right">
          <router-link to="/about-site" class="text-body-2 text-decoration-none">
            About This Site
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #4a6cf7, #f86cf7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.footer-bg {
  background-color: #1e1e1e !important;
}

.underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #4a6cf7;
}

@media (max-width: 960px) {
  .underline::after {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
