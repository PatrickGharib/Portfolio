<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePortfolioStore } from '../store'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const router = useRouter()
const store = usePortfolioStore()
const postId = computed(() => route.params.id)
const blogPostSection = ref(null)

const post = computed(() => {
  return store.blogPosts.find(post => post.id === postId.value) || null
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  
  // Find posts with similar tags
  return store.blogPosts
    .filter(p => p.id !== post.value.id && p.tags.some(tag => post.value.tags.includes(tag)))
    .slice(0, 3)
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(() => {
  // If post doesn't exist, redirect to blog page
  if (!post.value) {
    router.push('/blog')
    return
  }
  
  // Animate blog post section elements
  if (blogPostSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blogPostSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    
    tl.from('.post-header', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.post-meta', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.post-content', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
  }
})
</script>

<template>
  <div v-if="post" class="blog-post" ref="blogPostSection">
    <div class="post-header">
      <router-link to="/blog" class="back-link">
        ← Back to Blog
      </router-link>
      <h1 class="post-title">{{ post.title }}</h1>
    </div>
    
    <div class="post-meta">
      <div class="post-date">{{ formatDate(post.date) }}</div>
      <div class="post-tags">
        <router-link 
          v-for="(tag, index) in post.tags" 
          :key="index" 
          :to="`/blog?tag=${tag}`" 
          class="post-tag"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
    
    <div class="post-content">
      <!-- This would typically use a markdown renderer or v-html with sanitization -->
      <p v-for="(paragraph, index) in post.content.split('\n\n')" :key="index">
        {{ paragraph }}
      </p>
    </div>
    
    <div class="post-author">
      <div class="author-image">
        <!-- Placeholder for author image -->
        <div class="author-placeholder">
          <span>Author</span>
        </div>
      </div>
      <div class="author-info">
        <h3>About the Author</h3>
        <p>
          Software developer with a passion for creating elegant, efficient, and user-friendly web applications.
          I enjoy sharing my knowledge and experiences through writing.
        </p>
      </div>
    </div>
    
    <div class="post-share">
      <h3>Share this article</h3>
      <div class="share-buttons">
        <a href="#" class="share-button" aria-label="Share on Twitter">
          Twitter
        </a>
        <a href="#" class="share-button" aria-label="Share on LinkedIn">
          LinkedIn
        </a>
        <a href="#" class="share-button" aria-label="Share on Facebook">
          Facebook
        </a>
        <button class="share-button" @click="navigator.clipboard.writeText(window.location.href)" aria-label="Copy link">
          Copy Link
        </button>
      </div>
    </div>
    
    <div v-if="relatedPosts.length > 0" class="related-posts">
      <h2 class="subsection-title">Related Articles</h2>
      <div class="related-posts-grid">
        <div 
          v-for="relatedPost in relatedPosts" 
          :key="relatedPost.id" 
          class="related-post-card"
        >
          <div class="post-date">{{ formatDate(relatedPost.date) }}</div>
          <h3 class="post-title">
            <router-link :to="`/blog/${relatedPost.id}`">{{ relatedPost.title }}</router-link>
          </h3>
          <p class="post-summary">{{ relatedPost.summary }}</p>
          <router-link :to="`/blog/${relatedPost.id}`" class="read-more">
            Read More
          </router-link>
        </div>
      </div>
    </div>
    
    <div class="post-comments">
      <h2 class="subsection-title">Comments</h2>
      <div class="comments-container">
        <div class="comment-form">
          <h3>Leave a Comment</h3>
          <form @submit.prevent>
            <div class="form-group">
              <label for="name">Name *</label>
              <input type="text" id="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email * (will not be published)</label>
              <input type="email" id="email" required>
            </div>
            <div class="form-group">
              <label for="comment">Comment *</label>
              <textarea id="comment" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Post Comment</button>
          </form>
        </div>
        
        <div class="comments-list">
          <div class="comment">
            <div class="comment-header">
              <h4>John Doe</h4>
              <span class="comment-date">May 10, 2025</span>
            </div>
            <p class="comment-content">
              Great article! I've been using this approach in my projects and it's been a game-changer.
              Looking forward to more content like this.
            </p>
            <button class="reply-button">Reply</button>
          </div>
          
          <div class="comment">
            <div class="comment-header">
              <h4>Jane Smith</h4>
              <span class="comment-date">May 8, 2025</span>
            </div>
            <p class="comment-content">
              Thanks for sharing these insights. I've been struggling with this issue for a while,
              and your explanation really helped clarify things.
            </p>
            <button class="reply-button">Reply</button>
            
            <div class="comment-replies">
              <div class="comment reply">
                <div class="comment-header">
                  <h4>Author</h4>
                  <span class="comment-date">May 9, 2025</span>
                </div>
                <p class="comment-content">
                  Glad it was helpful, Jane! Let me know if you have any other questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-post {
  padding: 2rem 0 4rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.post-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--color-secondary);
}

.post-title {
  font-size: 2.5rem;
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.post-date {
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-tag {
  background-color: var(--color-background-soft);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.post-tag:hover {
  background-color: var(--color-primary);
  color: white;
}

.post-content {
  margin-bottom: 3rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.post-content p {
  margin-bottom: 1.5rem;
}

.post-author {
  display: flex;
  gap: 2rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 3rem;
}

.author-image {
  flex-shrink: 0;
}

.author-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
}

.author-info h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.author-info p {
  color: var(--color-text-light);
  line-height: 1.6;
}

.post-share {
  margin-bottom: 3rem;
  text-align: center;
}

.post-share h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.share-button {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.share-button:hover {
  background-color: var(--color-primary);
  color: white;
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

.related-posts {
  margin-bottom: 4rem;
}

.related-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.related-post-card {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.related-post-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.related-post-card .post-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.related-post-card .post-title a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.related-post-card .post-title a:hover {
  color: var(--color-primary);
}

.related-post-card .post-summary {
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.9rem;
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

.post-comments {
  margin-top: 4rem;
}

.comments-container {
  margin-top: 2rem;
}

.comment-form {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 3rem;
}

.comment-form h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.comments-list {
  margin-top: 2rem;
}

.comment {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 1.5rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.comment-header h4 {
  font-size: 1.1rem;
  margin: 0;
}

.comment-date {
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.comment-content {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.reply-button {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.reply-button:hover {
  color: var(--color-secondary);
}

.comment-replies {
  margin-top: 1.5rem;
  margin-left: 2rem;
}

.comment.reply {
  background-color: var(--color-background-soft);
}

@media (max-width: 768px) {
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .post-author {
    flex-direction: column;
    gap: 1rem;
  }
  
  .related-posts-grid {
    grid-template-columns: 1fr;
  }
  
  .share-buttons {
    flex-wrap: wrap;
  }
}
</style>
