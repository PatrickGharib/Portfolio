<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePortfolioStore } from '../store'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

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
          <div class="project-overlay">
            <div class="project-links">
              <a :href="project.demoUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                <span class="icon">🔗</span>
                Live Demo
              </a>
              <a :href="project.repoUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                <span class="icon">💻</span>
                Source Code
              </a>
            </div>
          </div>
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
    
    <div class="other-projects">
      <h2 class="subsection-title">Other Projects</h2>
      <p class="other-projects-intro">
        In addition to the featured projects above, I've worked on various smaller projects and contributions.
        Here are some highlights:
      </p>
      
      <div class="other-projects-grid">
        <div class="other-project-card">
          <h3>Personal Blog Platform</h3>
          <p>A custom blog platform built with Vue.js and Firebase, featuring markdown support and tag filtering.</p>
          <div class="project-tech">
            <span class="tech-tag">Vue.js</span>
            <span class="tech-tag">Firebase</span>
            <span class="tech-tag">Markdown</span>
          </div>
          <a href="#" class="project-link">View Project</a>
        </div>
        
        <div class="other-project-card">
          <h3>Recipe Finder App</h3>
          <p>A mobile-first web application that helps users find recipes based on ingredients they have on hand.</p>
          <div class="project-tech">
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">API Integration</span>
            <span class="tech-tag">Responsive Design</span>
          </div>
          <a href="#" class="project-link">View Project</a>
        </div>
        
        <div class="other-project-card">
          <h3>Budget Tracker</h3>
          <p>A progressive web app for tracking personal finances, with offline support and data visualization.</p>
          <div class="project-tech">
            <span class="tech-tag">PWA</span>
            <span class="tech-tag">IndexedDB</span>
            <span class="tech-tag">Chart.js</span>
          </div>
          <a href="#" class="project-link">View Project</a>
        </div>
        
        <div class="other-project-card">
          <h3>Open Source Contributions</h3>
          <p>Various contributions to open source projects, including bug fixes, documentation, and feature implementations.</p>
          <div class="project-tech">
            <span class="tech-tag">GitHub</span>
            <span class="tech-tag">Open Source</span>
            <span class="tech-tag">Collaboration</span>
          </div>
          <a href="#" class="project-link">View Contributions</a>
        </div>
      </div>
    </div>
    
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

<style scoped>
.projects {
  padding: 2rem 0 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.projects-intro {
  max-width: 800px;
  margin: 2rem auto 3rem;
  width: 100%;
  padding: 0 1rem;
}

.projects-intro p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-text);
  text-align: center;
}

.filter-container {
  margin-bottom: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-label {
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text);
  text-align: center;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.filter-btn {
  background-color: var(--color-background-soft);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  color: var(--color-text);
}

.filter-btn:hover {
  background-color: var(--color-background-mute);
}

.filter-btn.active {
  background-color: var(--color-primary);
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  justify-content: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
}

.project-card {
  background-color: var(--color-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.project-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  background-color: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
}

.project-link:hover {
  background-color: var(--color-secondary);
}

.icon {
  font-size: 1.2rem;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.project-description {
  color: var(--color-text-light);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background-color: var(--color-background-soft);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-highlight {
  background-color: var(--color-primary);
  color: white;
}

.no-results {
  text-align: center;
  padding: 3rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  margin-bottom: 4rem;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.no-results p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.other-projects {
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subsection-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.subsection-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 2px;
}

.other-projects-intro {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
  width: 100%;
  padding: 0 1rem;
}

.other-projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
}

.other-project-card {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.other-project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.other-project-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.other-project-card p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: var(--color-text-light);
}

.other-project-card .project-tech {
  margin-bottom: 1.5rem;
}

.other-project-card .project-link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  background-color: transparent;
  padding: 0;
}

.other-project-card .project-link:hover {
  color: var(--color-secondary);
}

.cta-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: 3rem;
  text-align: center;
  border-radius: 8px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-top: 2rem;
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

.cta-section .btn-primary {
  background: white;
  color: var(--color-primary);
}

.cta-section .btn-primary:hover {
  background: rgba(255, 255, 255, 0.9);
}

@media (max-width: 768px) {
  .projects-grid,
  .other-projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
