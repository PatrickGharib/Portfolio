<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePortfolioStore } from '../store'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const store = usePortfolioStore()
const skills = computed(() => store.skills)
const skillsSection = ref(null)

onMounted(() => {
  // Animate skills section elements
  if (skillsSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    
    tl.from('.skills-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.skills-intro', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.skill-category', {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    
    // Animate skill bars
    gsap.from('.skill-progress', {
      width: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
  }
})
</script>

<template>
  <div class="skills" ref="skillsSection">
    <h1 class="section-title skills-title">My Skills</h1>
    
    <div class="skills-intro">
      <p>
        I've developed a diverse set of skills throughout my career as a software developer.
        Below is an overview of my technical expertise and the tools I work with.
      </p>
    </div>
    
    <div class="skills-grid">
      <div 
        v-for="(category, index) in skills" 
        :key="index" 
        class="skill-category"
      >
        <h2 class="category-title">{{ category.category }}</h2>
        <div class="skill-list">
          <div 
            v-for="(skill, skillIndex) in category.items" 
            :key="skillIndex" 
            class="skill-item"
          >
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
    
    <div class="additional-skills">
      <h2 class="subsection-title">Additional Skills</h2>
      
      <div class="skills-cards">
        <div class="skill-card">
          <div class="skill-icon">🔍</div>
          <h3>Problem Solving</h3>
          <p>
            Analytical approach to identifying and solving complex technical challenges.
            Ability to break down problems into manageable components.
          </p>
        </div>
        
        <div class="skill-card">
          <div class="skill-icon">🤝</div>
          <h3>Collaboration</h3>
          <p>
            Experience working in agile teams, participating in code reviews,
            and communicating effectively with stakeholders.
          </p>
        </div>
        
        <div class="skill-card">
          <div class="skill-icon">📚</div>
          <h3>Continuous Learning</h3>
          <p>
            Commitment to staying current with emerging technologies and best practices.
            Self-directed learning and adaptation to new tools.
          </p>
        </div>
        
        <div class="skill-card">
          <div class="skill-icon">🎨</div>
          <h3>UI/UX Sensibility</h3>
          <p>
            Understanding of user experience principles and ability to implement
            responsive, accessible, and intuitive interfaces.
          </p>
        </div>
      </div>
    </div>
    
    <div class="tools-section">
      <h2 class="subsection-title">Tools & Technologies</h2>
      
      <div class="tools-grid">
        <div class="tool-category">
          <h3>Development Environments</h3>
          <div class="tools-list">
            <div class="tool-item">
              <span class="tool-name">VS Code</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
              </div>
            </div>
            <div class="tool-item">
              <span class="tool-name">WebStorm</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
              </div>
            </div>
            <div class="tool-item">
              <span class="tool-name">Sublime Text</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="tool-category">
          <h3>Version Control</h3>
          <div class="tools-list">
            <div class="tool-item">
              <span class="tool-name">Git</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
              </div>
            </div>
            <div class="tool-item">
              <span class="tool-name">GitHub</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
              </div>
            </div>
            <div class="tool-item">
              <span class="tool-name">GitLab</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="tool-category">
          <h3>Design Tools</h3>
          <div class="tools-list">
            <div class="tool-item">
              <span class="tool-name">Figma</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
              </div>
            </div>
            <div class="tool-item">
              <span class="tool-name">Adobe XD</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
              </div>
            </div>
            <div class="tool-item">
              <span class="tool-name">Sketch</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="tool-category">
          <h3>DevOps</h3>
          <div class="tools-list">
            <div class="tool-item">
              <span class="tool-name">Docker</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
              </div>
            </div>
            <div class="tool-item">
              <span class="tool-name">Jenkins</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
              </div>
            </div>
            <div class="tool-item">
              <span class="tool-name">AWS</span>
              <div class="tool-rating">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="learning-section">
      <h2 class="subsection-title">Currently Learning</h2>
      
      <div class="learning-grid">
        <div class="learning-item">
          <h3>TypeScript</h3>
          <p>
            Deepening my knowledge of TypeScript for building more robust and maintainable applications.
          </p>
          <div class="progress-container">
            <div class="progress-bar" style="width: 75%"></div>
            <span class="progress-text">75%</span>
          </div>
        </div>
        
        <div class="learning-item">
          <h3>GraphQL</h3>
          <p>
            Exploring GraphQL for more efficient API development and data fetching strategies.
          </p>
          <div class="progress-container">
            <div class="progress-bar" style="width: 60%"></div>
            <span class="progress-text">60%</span>
          </div>
        </div>
        
        <div class="learning-item">
          <h3>Kubernetes</h3>
          <p>
            Learning container orchestration for more scalable and resilient application deployment.
          </p>
          <div class="progress-container">
            <div class="progress-bar" style="width: 40%"></div>
            <span class="progress-text">40%</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="cta-section">
      <h2>Let's build something together</h2>
      <p>
        Interested in collaborating or have a project in mind?
        Let's discuss how my skills can help bring your ideas to life.
      </p>
      <router-link to="/contact" class="btn btn-primary">Get In Touch</router-link>
    </div>
  </div>
</template>

<style scoped>
.skills {
  padding: 2rem 0 4rem;
}

.skills-intro {
  max-width: 800px;
  margin: 2rem auto 4rem;
}

.skills-intro p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-text);
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.skill-category {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-category:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.category-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 2px;
}

.skill-item {
  margin-bottom: 1.5rem;
}

.skill-header {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.skill-name {
  font-weight: 500;
  text-align: center;
}

.skill-level {
  color: var(--color-text-light);
  font-size: 0.9rem;
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

.additional-skills {
  margin-bottom: 4rem;
}

.skills-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.skill-card {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.skill-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.skill-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.skill-card p {
  color: var(--color-text-light);
  line-height: 1.6;
}

.tools-section {
  margin-bottom: 4rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.tool-category {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.tool-category h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  position: relative;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.tool-category h3::after {
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

.tool-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.tool-name {
  font-weight: 500;
  text-align: center;
}

.tool-rating {
  display: flex;
}

.star {
  color: var(--color-background-mute);
  margin-left: 2px;
}

.star.filled {
  color: var(--color-primary);
}

.learning-section {
  margin-bottom: 4rem;
}

.learning-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.learning-item {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.learning-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
  text-align: center;
}

.learning-item p {
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
}

.progress-container {
  height: 8px;
  background-color: var(--color-background-mute);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 4px;
}

.progress-text {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 0.9rem;
  color: var(--color-text-light);
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
  .skills-grid,
  .skills-cards,
  .tools-grid,
  .learning-grid {
    grid-template-columns: 1fr;
  }
}
</style>
