<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePortfolioStore } from '../store'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import GithubProjects from '../components/projects/GithubProjects.vue'
import '../assets/styles/views/ProjectsView.css'

gsap.registerPlugin(ScrollTrigger)

const store = usePortfolioStore()
const projects = computed(() => store.projects)
const projectsSection = ref(null)
const activeFilter = ref('all')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(activeFilter.value.toLowerCase())
    )
  )
})

const uniqueTechnologies = computed(() => {
  const techs = new Set()
  projects.value.forEach(project => {
    project.technologies.forEach(tech => {
      techs.add(tech)
    })
  })
  return Array.from(techs).sort()
})

const setFilter = (filter) => {
  activeFilter.value = filter
}

onMounted(() => {
  // Animate projects section elements
  if (projectsSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    
    tl.from('.projects-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.projects-intro', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.filter-container', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.project-card', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
  }
})
</script>

<template>
  <div class="projects" ref="projectsSection">
    <h1 class="section-title projects-title">My Projects</h1>
    
    <div class="projects-intro">
      <p>
        Here's a selection of projects I've worked on. Each project represents different challenges
        and solutions, showcasing my skills and approach to software development.
      </p>
    </div>
    
    <div class="filter-container">
      <div class="filter-label">Filter by technology:</div>
      <div class="filter-options">
        <button 
          class="filter-btn" 
          :class="{ active: activeFilter === 'all' }" 
          @click="setFilter('all')"
        >
          All
        </button>
        <button 
          v-for="tech in uniqueTechnologies" 
          :key="tech" 
          class="filter-btn" 
          :class="{ active: activeFilter === tech }" 
          @click="setFilter(tech)"
        >
          {{ tech }}
        </button>
      </div>
    </div>
    
    <div class="projects-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="project-card"
      >
        <div class="project-image">
          <img :src="project.image" :alt="project.title" />
          <div class="project-overlay"></div>
        </div>
        <div class="project-content">
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tech">
            <span 
              v-for="(tech, index) in project.technologies" 
              :key="index" 
              class="tech-tag"
              :class="{ 'tech-highlight': tech === activeFilter }"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="no-results" v-if="filteredProjects.length === 0">
      <p>No projects found with the selected technology. Try a different filter.</p>
      <button class="btn btn-primary" @click="setFilter('all')">Show All Projects</button>
    </div>
    
    <!-- GitHub Projects Section -->
    <GithubProjects />
    
    <div class="cta-section">
      <h2>Have a project in mind?</h2>
      <p>
        I'm always interested in hearing about new projects and opportunities.
        Let's discuss how we can work together to bring your ideas to life.
      </p>
      <router-link to="/contact" class="btn btn-primary">Contact Me</router-link>
    </div>
  </div>
</template>
