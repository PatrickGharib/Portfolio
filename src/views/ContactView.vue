<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactSection = ref(null)
const form = ref(null)
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})
const formStatus = ref({
  submitted: false,
  success: false,
  message: ''
})
const isSubmitting = ref(false)

const submitForm = async () => {
  // Validate form
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    formStatus.value = {
      submitted: true,
      success: false,
      message: 'Please fill in all required fields.'
    }
    return
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    formStatus.value = {
      submitted: true,
      success: false,
      message: 'Please enter a valid email address.'
    }
    return
  }
  
  // Simulate form submission
  isSubmitting.value = true
  
  try {
    // In a real application, you would send the form data to a server
    // For this demo, we'll simulate a successful submission after a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    formStatus.value = {
      submitted: true,
      success: true,
      message: 'Thank you for your message! I\'ll get back to you as soon as possible.'
    }
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    formStatus.value = {
      submitted: true,
      success: false,
      message: 'There was an error sending your message. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formStatus.value = {
    submitted: false,
    success: false,
    message: ''
  }
}

onMounted(() => {
  // Animate contact section elements
  if (contactSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    
    tl.from('.contact-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.contact-intro', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.contact-grid', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
  }
})
</script>

<template>
  <div class="contact" ref="contactSection">
    <h1 class="section-title contact-title">Get In Touch</h1>
    
    <div class="contact-intro">
      <p>
        I'm always interested in hearing about new projects, opportunities, or just connecting with fellow developers.
        Feel free to reach out using the form below or through any of my social channels.
      </p>
    </div>
    
    <div class="contact-grid">
      <div class="contact-info">
        <div class="info-card">
          <div class="info-icon">📧</div>
          <h3>Email</h3>
          <p><a href="mailto:patrick.a.gharib@gmail.com">patrick.a.gharib@gmail.com</a></p>
        </div>
        
        <div class="info-card">
          <div class="info-icon">🔗</div>
          <h3>Social</h3>
          <div class="social-links">
            <a href="https://github.com/patrickgharib" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <span class="social-icon">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/patrick-a-b6b810162/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <span class="social-icon">LinkedIn</span>
            </a>
            <a href="https://twitter.com/patrickgharib" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <span class="social-icon">Twitter</span>
            </a>
          </div>
        </div>
        
        <div class="info-card">
          <div class="info-icon">📍</div>
          <h3>Location</h3>
          <p>Calgary, Alberta, Canada</p>
        </div>
        
        <div class="availability-card">
          <h3>Current Availability</h3>
          <div class="availability-status available">
            <span class="status-indicator"></span>
            <span>Available for freelance projects</span>
          </div>
          <p>
            I'm currently accepting new projects and would love to hear about yours.
            Let's schedule a call to discuss how I can help bring your ideas to life.
          </p>
        </div>
      </div>
      
      <div class="contact-form-container">
        <div v-if="formStatus.submitted && formStatus.success" class="form-success">
          <div class="success-icon">✓</div>
          <h3>Message Sent!</h3>
          <p>{{ formStatus.message }}</p>
          <button @click="resetForm" class="btn btn-primary">Send Another Message</button>
        </div>
        
        <form v-else ref="form" @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Name *</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              placeholder="Your name"
              :class="{ 'error': formStatus.submitted && !formData.name }"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              placeholder="Your email address"
              :class="{ 'error': formStatus.submitted && (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) }"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              v-model="formData.subject" 
              placeholder="What's this about?"
            >
          </div>
          
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              placeholder="Your message"
              rows="5"
              :class="{ 'error': formStatus.submitted && !formData.message }"
              required
            ></textarea>
          </div>
          
          <div v-if="formStatus.submitted && !formStatus.success" class="form-error">
            <p>{{ formStatus.message }}</p>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary" 
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <div class="faq-section">
      <h2 class="subsection-title">Frequently Asked Questions</h2>
      
      <div class="faq-grid">
        <div class="faq-item">
          <h3>What types of projects do you work on?</h3>
          <p>
            I specialize in building robust, scalable cloud-based solutions using modern JavaScript/TypeScript 
            frameworks like Vue.js and React. I also have extensive experience with microservice architecture, 
            Azure/AWS cloud services, and implementing DevOps best practices for mission-critical applications.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>What is your typical process for new projects?</h3>
          <p>
            My process begins with a thorough consultation to understand your business requirements and technical needs.
            I then develop a comprehensive architecture plan, establish CI/CD pipelines for efficient development,
            and implement Agile methodologies with regular sprint planning and backlog refinement to ensure
            transparent progress and on-time delivery.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>How do you handle project pricing?</h3>
          <p>
            Project pricing depends on the scope, complexity, and timeline. I offer both fixed-price quotes
            for well-defined projects and hourly rates for ongoing work or projects with evolving requirements.
            I'm happy to discuss options that fit your budget.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>Do you offer maintenance after project completion?</h3>
          <p>
            Yes, I offer comprehensive maintenance solutions including real-time monitoring with Datadog,
            proactive error detection, zero-downtime deployments, and continuous performance optimization.
            My maintenance approach ensures 99% uptime and rapid incident resolution for business-critical
            applications.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact {
  padding: 2rem 0 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-intro {
  max-width: 800px;
  margin: 2rem auto 4rem;
  width: 100%;
  padding: 0 1rem;
}

.contact-intro p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-text);
  text-align: center;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.info-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
  text-align: center;
  display: block;
}

.info-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  text-align: center;
}

.info-card p {
  color: var(--color-text-light);
  text-align: center;
}

.info-card a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-card a:hover {
  color: var(--color-secondary);
}

.social-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-icon {
  color: var(--color-primary);
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: var(--color-secondary);
}

.availability-card {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border-left: 4px solid #4caf50;
}

.availability-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-text);
  text-align: center;
}

.availability-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #4caf50;
}

.available {
  color: #4caf50;
  font-weight: 500;
}

.availability-card p {
  color: var(--color-text-light);
  line-height: 1.6;
  text-align: center;
}

.contact-form-container {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  text-align: center;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #f44336;
}

.form-error {
  color: #f44336;
  font-size: 0.9rem;
  text-align: center;
}

.form-actions {
  margin-top: 1rem;
  text-align: center;
}

.form-success {
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-icon {
  font-size: 3rem;
  color: #4caf50;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(76, 175, 80, 0.1);
}

.form-success h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text);
  text-align: center;
}

.form-success p {
  color: var(--color-text-light);
  margin-bottom: 2rem;
  text-align: center;
}

.faq-section {
  margin-top: 4rem;
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

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 0 1rem;
}

.faq-item {
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.faq-item h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
  text-align: center;
}

.faq-item p {
  color: var(--color-text-light);
  line-height: 1.6;
  text-align: center;
}

@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    order: 2;
  }
  
  .contact-form-container {
    order: 1;
  }
}

@media (max-width: 768px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
