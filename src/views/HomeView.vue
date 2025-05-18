<script setup>
import { usePortfolioStore } from '../store'
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'

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

<style scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Hero Section */
.hero {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 0 1rem;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--color-text-light);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.arrow {
  margin-top: 0.5rem;
  width: 20px;
  height: 40px;
  position: relative;
}

.arrow span {
  display: block;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid var(--color-text-light);
  border-right: 2px solid var(--color-text-light);
  transform: rotate(45deg);
  margin: -10px 0;
  animation: scrollArrow 2s infinite;
}

.arrow span:nth-child(2) {
  animation-delay: -0.2s;
}

.arrow span:nth-child(3) {
  animation-delay: -0.4s;
}

@keyframes scrollArrow {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-20px, -20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(20px, 20px);
  }
}

/* About Preview Section */
.about-preview {
  background-color: var(--color-background-soft);
  padding: 6rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
}

.about-text p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: center;
}

.about-text .btn {
  display: block;
  margin: 0 auto;
  max-width: fit-content;
}

.skill-category {
  margin-bottom: 2rem;
}

.skill-category h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
  text-align: center;
}

.skill-item {
  margin-bottom: 1rem;
}

.skill-name {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-align: center;
}

.skill-bar {
  height: 8px;
  background-color: var(--color-background-mute);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

/* Projects Preview Section */
.projects-preview {
  padding: 6rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
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
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.project-image {
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  text-align: center;
}

.project-description {
  color: var(--color-text-light);
  margin-bottom: 1rem;
  line-height: 1.6;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  text-align: center;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  margin-top: auto;
  justify-content: center;
}

.tech-tag {
  background-color: var(--color-background-soft);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.project-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.project-link:hover {
  color: var(--color-secondary);
}

.view-all {
  text-align: center;
  margin-top: 3rem;
}

/* Contact CTA Section */
.contact-cta {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  padding: 6rem 0;
  text-align: center;
  border-radius: 8px;
  margin-top: 4rem;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1rem;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-content .btn-primary {
  background: white;
  color: var(--color-primary);
}

.cta-content .btn-primary:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-cta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-cta .btn {
    width: 100%;
  }
}
</style>
