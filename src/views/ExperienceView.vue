<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePortfolioStore } from '../store'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const store = usePortfolioStore()
const experiences = computed(() => store.experiences)
const experienceSection = ref(null)

onMounted(() => {
  // Animate experience section elements
  if (experienceSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: experienceSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    
    tl.from('.experience-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.experience-intro', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.timeline-item', {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
  }
})
</script>

<template>
  <div class="experience" ref="experienceSection">
    <h1 class="section-title experience-title">Work Experience</h1>
    
    <div class="experience-intro">
      <p>
        Throughout my career, I've had the opportunity to work with diverse teams on a variety of projects,
        from startups to established companies. Each role has contributed to my growth as a developer and
        expanded my technical expertise.
      </p>
    </div>
    
    <div class="timeline">
      <div class="timeline-item" v-for="(exp, index) in experiences" :key="exp.id">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h2 class="company">{{ exp.company }}</h2>
            <span class="period">{{ exp.period }}</span>
          </div>
          <h3 class="position">{{ exp.position }}</h3>
          <p class="description">{{ exp.description }}</p>
          <div class="technologies">
            <span class="tech-tag" v-for="(tech, techIndex) in exp.technologies" :key="techIndex">
              {{ tech }}
            </span>
          </div>
          
          <div class="achievements" v-if="index === 0">
            <h4>Key Achievements</h4>
            <ul>
              <li>Spearheaded cross-functional teams (engineers, QA, DevOps) to deliver mission-critical projects for five high-profile fundraising clients, achieving a 95% on-time delivery rate.</li>
              <li>Championed Agile development (Scrum) via sprint planning, backlog refinement in Jira, and comprehensive architecture documentation in Confluence.</li>
              <li>Developed and maintained modern, responsive UI/UX with Vue.js, integrating Auth0 for seamless user authentication and role-based access control.</li>
              <li>Integrated PCI-compliant payment systems into both frontend and backend, improving transaction security and reliability.</li>
              <li>Leveraged Datadog for real-time monitoring and alerting, reducing incident resolution times by 40%.</li>
            </ul>
          </div>
          
          <div class="achievements" v-if="index === 1">
            <h4>Key Achievements</h4>
            <ul>
              <li>Delivered high-performance, user-facing Vue.js interfaces, increasing customer engagement and satisfaction across multiple platforms.</li>
              <li>Automated CI/CD pipelines with Azure DevOps, reducing deployment time by 30% and minimizing manual intervention.</li>
              <li>Integrated PCI-compliant payment solutions to replace legacy gateways, bolstering security and cutting payment failures by 20%.</li>
              <li>Maintained Azure Service Bus and Dockerized microservices, ensuring reliable cross-service communication and streamlined scaling.</li>
              <li>Implemented Datadog for proactive error monitoring, preventing major incidents and improving SLA adherence.</li>
            </ul>
          </div>
          
          <div class="achievements" v-if="index === 2">
            <h4>Key Achievements</h4>
            <ul>
              <li>Led the migration of the eConsult platform to mobile (Android/iOS) using Capacitor, React, and TypeScript, increasing user reach by 40%.</li>
              <li>Engineered responsive, high-performing React.js interfaces, improving overall user experience and adoption rates.</li>
              <li>Integrated Firestore queries in both Java and React, enabling dynamic content updates and fast data synchronization.</li>
              <li>Streamlined the CI/CD pipeline with automated linting and type-checking, improving code quality and deployment consistency.</li>
            </ul>
          </div>
          
          <div class="achievements" v-if="index === 3">
            <h4>Key Achievements</h4>
            <ul>
              <li>Developed an MRI seizure visualization prototype in VR using Unity and C#, providing neurologists with enhanced diagnostic tools.</li>
              <li>Collaborated with IBM to design a VR platform for seismic and geophysical data visualization, accelerating research insights.</li>
              <li>Published research papers on immersive visualization techniques for medical and geophysical data.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div class="skills-section">
      <h2 class="subsection-title">Professional Skills</h2>
      
      <div class="skills-container">
        <div class="skill-category" v-for="(category, index) in store.skills" :key="index">
          <h3>{{ category.category }}</h3>
          <div class="skill-list">
            <div class="skill-item" v-for="(skill, skillIndex) in category.items" :key="skillIndex">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="cta-section">
      <h2>Interested in working together?</h2>
      <p>
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </p>
      <div class="cta-buttons">
        <router-link to="/contact" class="btn btn-primary">Get In Touch</router-link>
        <router-link to="/projects" class="btn btn-secondary">View My Projects</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experience {
  padding: 2rem 0 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.experience-intro {
  max-width: 800px;
  margin: 2rem auto 4rem;
  width: 100%;
  padding: 0 1rem;
}

.experience-intro p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-text);
  text-align: center;
}

.timeline {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background-color: var(--color-border);
}

.timeline-item {
  position: relative;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.timeline-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.timeline-marker {
  position: absolute;
  top: 0;
  left: -2rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border: 3px solid var(--color-background);
}

.timeline-content {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.company {
  font-size: 1.8rem;
  color: var(--color-primary);
  margin: 0;
}

.period {
  font-size: 1rem;
  color: var(--color-text-light);
  background-color: var(--color-background-soft);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.position {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background-color: var(--color-background-soft);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.achievements h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.achievements ul {
  padding-left: 1.5rem;
}

.achievements li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.skills-section {
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subsection-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
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

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
}

.skill-category {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.skill-category h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.skill-category h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 2px;
}

.skill-item {
  margin-bottom: 1.5rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 500;
}

.skill-level {
  color: var(--color-text-light);
  font-size: 0.9rem;
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

.cta-section {
  background-color: var(--color-background-soft);
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
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
  color: var(--color-text-light);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
  
  .cta-buttons .btn {
    width: 100%;
  }
}
</style>
