<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePortfolioStore } from '../store'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const store = usePortfolioStore()
const blogPosts = computed(() => store.blogPosts)
const blogSection = ref(null)
const searchQuery = ref('')
const activeTag = ref('')

const filteredPosts = computed(() => {
  let filtered = blogPosts.value
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.summary.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    )
  }
  
  // Filter by tag
  if (activeTag.value) {
    filtered = filtered.filter(post => 
      post.tags.includes(activeTag.value)
    )
  }
  
  return filtered
})

const allTags = computed(() => {
  const tags = new Set()
  blogPosts.value.forEach(post => {
    post.tags.forEach(tag => {
      tags.add(tag)
    })
  })
  return Array.from(tags).sort()
})

const setTag = (tag) => {
  if (activeTag.value === tag) {
    activeTag.value = ''
  } else {
    activeTag.value = tag
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  activeTag.value = ''
}

onMounted(() => {
  // Animate blog section elements
  if (blogSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blogSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    
    tl.from('.blog-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.blog-intro', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.blog-filters', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.blog-post-card', {
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
  <div class="blog" ref="blogSection">
    <h1 class="section-title blog-title">Blog</h1>
    
    <div class="blog-intro">
      <p>
        Welcome to my blog, where I share insights, tutorials, and thoughts on web development,
        programming, and technology. Browse the articles below or use the search and filters to find specific topics.
      </p>
    </div>
    
    <div class="blog-filters">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search articles..." 
          class="search-input"
        >
      </div>
      
      <div class="tags-container">
        <div class="tags-label">Filter by tag:</div>
        <div class="tags-list">
          <button 
            v-for="tag in allTags" 
            :key="tag" 
            class="tag-btn" 
            :class="{ active: activeTag === tag }" 
            @click="setTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
      
      <button v-if="searchQuery || activeTag" @click="clearFilters" class="clear-filters-btn">
        Clear Filters
      </button>
    </div>
    
    <div v-if="filteredPosts.length === 0" class="no-results">
      <p>No articles found matching your search criteria.</p>
      <button @click="clearFilters" class="btn btn-primary">Clear Filters</button>
    </div>
    
    <div v-else class="blog-posts-grid">
      <div 
        v-for="post in filteredPosts" 
        :key="post.id" 
        class="blog-post-card"
      >
        <div class="post-date">{{ post.date }}</div>
        <h2 class="post-title">
          <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
        </h2>
        <p class="post-summary">{{ post.summary }}</p>
        <div class="post-tags">
          <span 
            v-for="(tag, index) in post.tags" 
            :key="index" 
            class="post-tag"
            :class="{ 'tag-highlight': tag === activeTag }"
            @click="setTag(tag)"
          >
            {{ tag }}
          </span>
        </div>
        <router-link :to="`/blog/${post.id}`" class="read-more">
          Read More
        </router-link>
      </div>
    </div>
    
    <div class="newsletter-section">
      <h2 class="subsection-title">Subscribe to My Newsletter</h2>
      <p>
        Stay updated with my latest articles, tutorials, and insights.
        I send out a newsletter once a month with exclusive content and tips.
      </p>
      
      <form @submit.prevent class="newsletter-form">
        <div class="form-group">
          <input 
            type="email" 
            placeholder="Your email address" 
            required
          >
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </div>
        <p class="form-note">
          I respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.blog {
  padding: 2rem 0 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog-intro {
  max-width: 800px;
  margin: 2rem auto 3rem;
  width: 100%;
  padding: 0 1rem;
}

.blog-intro p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-text);
  text-align: center;
}

.blog-filters {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
}

.search-container {
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
}

.tags-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tags-label {
  font-weight: 600;
  color: var(--color-text);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-btn {
  background-color: var(--color-background-soft);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  color: var(--color-text);
}

.tag-btn:hover {
  background-color: var(--color-background-mute);
}

.tag-btn.active {
  background-color: var(--color-primary);
  color: white;
}

.clear-filters-btn {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.clear-filters-btn:hover {
  color: var(--color-secondary);
}

.no-results {
  text-align: center;
  padding: 3rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  margin-bottom: 4rem;
}

.no-results p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.blog-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
}

.blog-post-card {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.blog-post-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.post-date {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: 0.75rem;
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.post-title a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-title a:hover {
  color: var(--color-primary);
}

.post-summary {
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.post-tag {
  background-color: var(--color-background-soft);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-tag:hover {
  background-color: var(--color-background-mute);
}

.tag-highlight {
  background-color: var(--color-primary);
  color: white;
}

.read-more {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: var(--color-secondary);
}

.newsletter-section {
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

.newsletter-section p {
  max-width: 600px;
  margin: 0 auto 2rem;
  color: var(--color-text-light);
  line-height: 1.6;
}

.newsletter-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  gap: 0.5rem;
}

.form-group input {
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-note {
  font-size: 0.85rem;
  margin-top: 1rem;
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .blog-posts-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group {
    flex-direction: column;
  }
  
  .form-group .btn {
    width: 100%;
  }
}
</style>
