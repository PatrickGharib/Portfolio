<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  // Animate 404 elements
  const tl = gsap.timeline()
  
  tl.from('.not-found-title', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .from('.not-found-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.not-found-image', {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.not-found-actions', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4')
})
</script>

<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <h2 class="not-found-subtitle">Page Not Found</h2>
      
      <div class="not-found-image">
        <div class="image-container">
          <div class="image-placeholder">
            <span>404</span>
          </div>
        </div>
      </div>
      
      <p class="not-found-message">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div class="not-found-actions">
        <router-link to="/" class="btn btn-primary">Go Home</router-link>
        <button @click="$router.go(-1)" class="btn btn-secondary">Go Back</button>
      </div>
    </div>
    
    <div class="suggestions">
      <h3>You might be looking for:</h3>
      <ul class="suggestion-links">
        <li>
          <router-link to="/projects">Projects</router-link>
          <span>Check out my portfolio of work</span>
        </li>
        <li>
          <router-link to="/about">About</router-link>
          <span>Learn more about me and my background</span>
        </li>
        <li>
          <router-link to="/blog">Blog</router-link>
          <span>Read my latest articles and tutorials</span>
        </li>
        <li>
          <router-link to="/contact">Contact</router-link>
          <span>Get in touch with me</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  padding: 4rem 0;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.not-found-content {
  margin-bottom: 4rem;
}

.not-found-title {
  font-size: 8rem;
  font-weight: 800;
  margin-bottom: 0;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.not-found-subtitle {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.not-found-image {
  margin: 2rem auto;
  max-width: 300px;
}

.image-container {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 4rem;
  opacity: 0.7;
}

.not-found-message {
  font-size: 1.2rem;
  color: var(--color-text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.not-found-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.suggestions {
  background-color: var(--color-background-soft);
  border-radius: 8px;
  padding: 2rem;
  text-align: left;
}

.suggestions h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.suggestion-links {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.suggestion-links li {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.suggestion-links a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.suggestion-links a:hover {
  color: var(--color-secondary);
}

.suggestion-links span {
  color: var(--color-text-light);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .not-found-title {
    font-size: 6rem;
  }
  
  .not-found-subtitle {
    font-size: 1.5rem;
  }
  
  .not-found-actions {
    flex-direction: column;
  }
  
  .not-found-actions .btn {
    width: 100%;
  }
  
  .suggestion-links {
    grid-template-columns: 1fr;
  }
}
</style>
