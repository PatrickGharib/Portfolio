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
  <div class="home">
    <!-- Hero Section -->
    <section class="hero" ref="heroSection">
      <div class="hero-content">
        <h1 class="hero-title">Patrick Abou Gharib</h1>
        <p class="hero-subtitle">
          Lead Software Developer specializing in robust, scalable cloud-based solutions
        </p>
        <div class="hero-cta">
          <router-link to="/projects" class="btn btn-primary">View My Work</router-link>
          <router-link to="/contact" class="btn btn-secondary">Get In Touch</router-link>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Scroll Down</span>
        <div class="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>

    <!-- About Section Preview -->
    <section class="section about-preview">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="about-text">
          <p>
            I'm a proactive Lead Software Engineer with 5+ years of full-stack development experience,
            specializing in building robust, scalable cloud-based solutions. I have demonstrated success
            leading cross-functional teams, delivering mission-critical projects on time, and driving
            over $10M in annual revenue.
          </p>
          <router-link to="/about" class="btn btn-secondary">Learn More</router-link>
        </div>
        <div class="about-skills">
          <div class="skill-category" v-for="(category, index) in store.skills.slice(0, 2)" :key="index">
            <h3>{{ category.category }}</h3>
            <div class="skill-list">
              <div class="skill-item" v-for="(skill, skillIndex) in category.items.slice(0, 3)" :key="skillIndex">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="skill-bar">
                  <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="section projects-preview">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        <div class="project-card" v-for="project in featuredProjects" :key="project.id">
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="(tech, index) in project.technologies" :key="index" class="tech-tag">
                {{ tech }}
              </span>
            </div>
            <div class="project-links">
              <a :href="project.demoUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                Live Demo
              </a>
              <a :href="project.repoUrl" target="_blank" rel="noopener noreferrer" class="project-link">
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="view-all">
        <router-link to="/projects" class="btn btn-primary">View All Projects</router-link>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="section contact-cta">
      <div class="cta-content">
        <h2>Let's Work Together</h2>
        <p>
          Have a project in mind or want to discuss potential opportunities?
          I'm always open to new challenges and collaborations.
        </p>
        <router-link to="/contact" class="btn btn-primary">Get In Touch</router-link>
      </div>
    </section>
  </div>
</template>
