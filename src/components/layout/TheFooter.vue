<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/patrickgharib', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/patrick-a-b6b810162/', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/patrickgharib', icon: 'twitter' },
  { name: 'Email', url: 'mailto:patrick.a.gharib@gmail.com', icon: 'email' }
]
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <router-link to="/">
            <span class="name">Portfolio</span>
          </router-link>
          <p class="tagline">Lead Software Developer</p>
        </div>
        
        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/experience">Experience</router-link></li>
            <li><router-link to="/projects">Projects</router-link></li>
            <li><router-link to="/skills">Skills</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
        
        <div class="footer-social">
          <h3>Connect</h3>
          <div class="social-icons">
            <a 
              v-for="link in socialLinks" 
              :key="link.name" 
              :href="link.url" 
              target="_blank" 
              rel="noopener noreferrer"
              :aria-label="link.name"
            >
              <span class="icon" :class="link.icon">{{ link.name[0] }}</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Portfolio. All rights reserved.</p>
        <p>
          <router-link to="/about-site">About This Site</router-link>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--color-background-soft);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-logo .name {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #4a6cf7, #f86cf7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-logo a {
  text-decoration: none;
}

.tagline {
  margin-top: 0.5rem;
  color: var(--color-text-light);
}

.footer-links h3,
.footer-social h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.footer-links h3::after,
.footer-social h3::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: var(--color-primary);
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  text-decoration: none;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--color-primary);
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-3px);
}

.icon {
  font-size: 1.2rem;
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom p {
  margin: 0;
  color: var(--color-text-light);
}

.footer-bottom a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-bottom a:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-links h3::after,
  .footer-social h3::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
