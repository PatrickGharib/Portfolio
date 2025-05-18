<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import '../assets/styles/views/ContactView.css'

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

const submitForm = () => {
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
  
  // Create mailto URL with form data
  const subject = encodeURIComponent(formData.value.subject || 'Contact from Portfolio');
  const body = encodeURIComponent(
    `Name: ${formData.value.name}\nEmail: ${formData.value.email}\n\n${formData.value.message}`
  );
  
  // Open email client
  window.location.href = `mailto:patrick.a.gharib@gmail.com?subject=${subject}&body=${body}`;
  
  // Update form status
  formStatus.value = {
    submitted: true,
    success: true,
    message: 'Opening your email client. If nothing happens, please email me directly at patrick.a.gharib@gmail.com'
  };
  
  // Reset form
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
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
