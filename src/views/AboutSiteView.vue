<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutSiteSection = ref(null)

onMounted(() => {
  // Animate about site section elements
  if (aboutSiteSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSiteSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    
    tl.from('.about-site-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.about-site-intro', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.tech-stack', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.tech-card', {
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
  <div class="about-site" ref="aboutSiteSection">
    <h1 class="section-title about-site-title">About This Site</h1>
    
    <div class="about-site-intro">
      <p>
        This portfolio website was built as a showcase of my web development skills and to provide
        information about my work, experience, and capabilities. Here's some information about how it was built.
      </p>
    </div>
    
    <div class="tech-stack">
      <h2 class="subsection-title">Technology Stack</h2>
      
      <div class="tech-grid">
        <div class="tech-card">
          <div class="tech-icon">⚡</div>
          <h3>Vue.js</h3>
          <p>
            This site is built with Vue 3, utilizing the Composition API for better code organization
            and reusability. Vue's reactive system makes it easy to create dynamic, responsive interfaces.
          </p>
        </div>
        
        <div class="tech-card">
          <div class="tech-icon">🗃️</div>
          <h3>Pinia</h3>
          <p>
            State management is handled with Pinia, the official state management library for Vue.
            It provides a simple and intuitive API for managing application state.
          </p>
        </div>
        
        <div class="tech-card">
          <div class="tech-icon">🛣️</div>
          <h3>Vue Router</h3>
          <p>
            Navigation and routing are implemented with Vue Router, enabling a smooth single-page
            application experience with dynamic route matching and lazy loading.
          </p>
        </div>
        
        <div class="tech-card">
          <div class="tech-icon">✨</div>
          <h3>GSAP</h3>
          <p>
            Animations are powered by GreenSock Animation Platform (GSAP), providing smooth,
            high-performance animations and transitions throughout the site.
          </p>
        </div>
        
        <div class="tech-card">
          <div class="tech-icon">🎨</div>
          <h3>CSS Variables</h3>
          <p>
            The site uses CSS custom properties (variables) for theming, making it easy to
            implement features like dark mode and maintain consistent styling.
          </p>
        </div>
        
        <div class="tech-card">
          <div class="tech-icon">📱</div>
          <h3>Responsive Design</h3>
          <p>
            The site is fully responsive, adapting to different screen sizes and devices
            using CSS Grid, Flexbox, and media queries.
          </p>
        </div>
      </div>
    </div>
    
    <div class="features-section">
      <h2 class="subsection-title">Key Features</h2>
      
      <div class="features-list">
        <div class="feature-item">
          <h3>Dark/Light Mode</h3>
          <p>
            The site includes a theme toggle that allows users to switch between dark and light modes,
            with preferences saved to local storage.
          </p>
        </div>
        
        <div class="feature-item">
          <h3>Smooth Animations</h3>
          <p>
            Page transitions and scroll-triggered animations enhance the user experience,
            making navigation feel smooth and engaging.
          </p>
        </div>
        
        <div class="feature-item">
          <h3>Optimized Performance</h3>
          <p>
            The site is optimized for performance with lazy-loaded components, efficient state management,
            and optimized assets.
          </p>
        </div>
        
        <div class="feature-item">
          <h3>Accessibility</h3>
          <p>
            Accessibility best practices are followed throughout the site, including semantic HTML,
            ARIA attributes, and keyboard navigation support.
          </p>
        </div>
      </div>
    </div>
    
    <div class="development-section">
      <h2 class="subsection-title">Development Process</h2>
      
      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Planning & Design</h3>
            <p>
              The development process began with planning the site structure, defining the key sections,
              and creating wireframes for the layout and user interface.
            </p>
          </div>
        </div>
        
        <div class="process-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Component Architecture</h3>
            <p>
              The site was built using a component-based architecture, with reusable components
              for common UI elements and layout structures.
            </p>
          </div>
        </div>
        
        <div class="process-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Responsive Implementation</h3>
            <p>
              Each component was implemented with responsiveness in mind, ensuring a consistent
              experience across different devices and screen sizes.
            </p>
          </div>
        </div>
        
        <div class="process-step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>Animation & Interactivity</h3>
            <p>
              Animations and interactive elements were added to enhance the user experience,
              with careful attention to performance and accessibility.
            </p>
          </div>
        </div>
        
        <div class="process-step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>Testing & Optimization</h3>
            <p>
              The site was tested across different browsers and devices, with optimizations
              for performance, accessibility, and user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="source-code-section">
      <h2 class="subsection-title">Source Code</h2>
      <p>
        The source code for this portfolio site is available on GitHub. Feel free to check it out,
        fork it, or use it as inspiration for your own projects.
      </p>
      <a href="https://github.com/yourusername/portfolio-site" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        View on GitHub
      </a>
    </div>
  </div>
</template>

<style scoped>
.about-site {
  padding: 2rem 0 4rem;
}

.about-site-intro {
  max-width: 800px;
  margin: 2rem auto 4rem;
}

.about-site-intro p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-text);
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

.tech-stack {
  margin-bottom: 4rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.tech-card {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.tech-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.tech-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.tech-card p {
  color: var(--color-text-light);
  line-height: 1.6;
}

.features-section {
  margin-bottom: 4rem;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.feature-item {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.feature-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.feature-item p {
  color: var(--color-text-light);
  line-height: 1.6;
}

.development-section {
  margin-bottom: 4rem;
}

.process-steps {
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.process-step {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.step-content {
  flex-grow: 1;
}

.step-content h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.step-content p {
  color: var(--color-text-light);
  line-height: 1.6;
}

.source-code-section {
  background-color: var(--color-background-soft);
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.source-code-section p {
  max-width: 600px;
  margin: 0 auto 2rem;
  color: var(--color-text-light);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .tech-grid,
  .features-list {
    grid-template-columns: 1fr;
  }
  
  .process-step {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
