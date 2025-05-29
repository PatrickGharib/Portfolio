<script setup>
import { usePortfolioStore } from '../store'
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import '../assets/styles/views/HomeView.css'

const store = usePortfolioStore()
const heroSection = ref(null)
const featuredProjects = computed(() => store.getFeaturedProjects)

onMounted(() => {
  // Animate hero section elements
  if (heroSection.value) {
    const tl = gsap.timeline()
    
    tl.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-cta', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.scroll-indicator', {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
  }
})
</script>

<template>
  <v-container fluid class="pa-0">
    <!-- Hero Section -->
    <v-sheet class="hero d-flex flex-column justify-center align-center text-center py-16" color="transparent" ref="heroSection">
      <v-container>
        <h1 class="text-h2 font-weight-bold hero-title mb-4">Patrick Abou Gharib</h1>
        <p class="text-subtitle-1 mb-6 hero-subtitle">
          Lead Software Developer specializing in robust, scalable cloud-based solutions
        </p>
        <div class="hero-cta d-flex justify-center flex-wrap gap-4">
          <v-btn size="large" to="/projects" class="mr-2 gradient-btn">
            View My Work
          </v-btn>
          <v-btn size="large" to="/contact" class="gradient-btn-outline">
            Get In Touch
          </v-btn>
        </div>
      </v-container>
      
      <div class="scroll-indicator mt-16">
        <span class="text-body-2 d-block mb-2">Scroll Down</span>
        <div class="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </v-sheet>

    <!-- About Section Preview -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold mb-6 position-relative underline-title">About Me</h2>
        </v-col>
      </v-row>
      
      <v-row class="mt-6">
        <v-col cols="12" md="6" class="mb-6">
          <div class="about-card pa-6">
            <p class="text-body-1 mb-6">
              I'm a proactive Lead Software Engineer with 5+ years of full-stack development experience,
              specializing in building robust, scalable cloud-based solutions. I have demonstrated success
              leading cross-functional teams, delivering mission-critical projects on time, and driving
              over $10M in annual revenue.
            </p>
            <v-btn to="/about" class="gradient-btn-outline">Learn More</v-btn>
          </div>
        </v-col>
        
        <v-col cols="12" md="6">
          <div class="about-card pa-6">
            <v-row>
              <v-col cols="12" v-for="(category, index) in store.skills.slice(0, 2)" :key="index" class="mb-6">
                <h3 class="text-h6 mb-4">{{ category.category }}</h3>
                <div v-for="(skill, skillIndex) in category.items.slice(0, 3)" :key="skillIndex" class="mb-3">
                  <div class="d-flex justify-space-between mb-1">
                    <span class="text-subtitle-2">{{ skill.name }}</span>
                  </div>
                  <v-progress-linear
                    :model-value="skill.level"
                    height="8"
                    rounded
                    bg-color="secondary"
                    color="primary"
                  ></v-progress-linear>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Featured Projects -->
    <v-sheet color="transparent" class="py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-6 position-relative underline-title">Featured Projects</h2>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col 
            v-for="project in featuredProjects" 
            :key="project.id"
            cols="12"
            sm="6"
            lg="4"
            class="mb-6"
          >
            <v-card elevation="4" height="100%" class="featured-project-card">
              <v-img
                :src="project.image"
                :alt="project.title"
                height="200"
                cover
              ></v-img>
              
              <v-card-item>
                <v-card-title>{{ project.title }}</v-card-title>
                <v-card-text>
                  <p class="mb-4">{{ project.description }}</p>
                  
                  <div class="d-flex flex-wrap gap-1 mb-4">
                    <v-chip
                      v-for="(tech, index) in project.technologies"
                      :key="index"
                      size="small"
                      class="mr-1 mb-1"
                      variant="outlined"
                    >
                      {{ tech }}
                    </v-chip>
                  </div>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn variant="text" :href="project.demoUrl" target="_blank">Live Demo</v-btn>
                  <v-btn variant="text" :href="project.repoUrl" target="_blank">Source Code</v-btn>
                </v-card-actions>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
        
        <v-row class="mt-6">
          <v-col cols="12" class="text-center">
            <v-btn to="/projects" size="large" class="gradient-btn">View All Projects</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Contact CTA -->
    <v-sheet color="transparent" class="py-16 contact-cta">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">Let's Work Together</h2>
            <p class="text-body-1 mb-8">
              Have a project in mind or want to discuss potential opportunities?
              I'm always open to new challenges and collaborations.
            </p>
            <v-btn size="large" to="/contact" class="gradient-btn">Get In Touch</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.hero {
  min-height: 100vh;
}

.underline-title::after {
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

.arrow {
  margin-top: 0.5rem;
}

.arrow span {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border-bottom: 2px solid #4a6cf7;
  border-right: 2px solid #4a6cf7;
  transform: rotate(45deg);
  margin: -10px;
  animation: animate 2s infinite;
}

.gradient-btn {
  background: linear-gradient(90deg, #4a6cf7, #f86cf7) !important;
  color: white !important;
  box-shadow: var(--shadow-md);
}

.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.gradient-btn-outline {
  background-color: transparent !important;
  box-shadow: none !important;
  position: relative;
  z-index: 1;
  color: white !important;
  border: none !important;
}

.gradient-btn-outline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(90deg, #4a6cf7, #f86cf7);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.gradient-btn-outline:hover {
  background-color: rgba(74, 108, 247, 0.1) !important;
}

.arrow span:nth-child(2) {
  animation-delay: -0.2s;
}

.arrow span:nth-child(3) {
  animation-delay: -0.4s;
}

.featured-project-card {
  background-color: var(--color-background) !important;
  position: relative;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.about-card {
  background-color: var(--color-background);
  border-radius: 8px;
  height: 100%;
  position: relative;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.contact-cta {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-cta:hover {
  box-shadow: var(--shadow-lg);
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-1rem, -1rem);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(1rem, 1rem);
  }
}
</style>
