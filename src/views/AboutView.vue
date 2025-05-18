<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import '../assets/styles/views/AboutView.css'

gsap.registerPlugin(ScrollTrigger)

const aboutSection = ref(null)

onMounted(() => {
  // Animate about section elements
  if (aboutSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    })
    
    tl.from('.about-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.about-content', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
  }
})
</script>

<template>
  <div class="about" ref="aboutSection">
    <h1 class="section-title about-title">About Me</h1>
    
    <div class="about-content">
      <div class="about-image">
        <div class="image-container">
          <!-- Placeholder for profile image -->
          <div class="profile-placeholder">
            <span>Profile Image</span>
          </div>
        </div>
      </div>
      
      <div class="about-text">
        <h2>Lead Software Developer</h2>
        <p>
          Hello! I'm Patrick Abou Gharib, a proactive Lead Software Engineer with 5+ years of full-stack development experience, 
          specializing in building robust, scalable cloud-based solutions. I have demonstrated success leading cross-functional teams, 
          delivering mission-critical projects on time, and driving over $10M in annual revenue.
        </p>
        
        <p>
          I'm skilled in architecting microservice-based systems, integrating DevOps best practices, and improving efficiency and time-to-market. 
          My technical expertise spans across JavaScript/TypeScript, Vue.js, React.js, C#, Python, and various cloud platforms including 
          Azure and AWS.
        </p>
        
        <p>
          Throughout my career, I've focused on developing high-performance, user-facing interfaces while also implementing robust backend 
          solutions. I'm passionate about creating seamless user experiences and solving complex technical challenges through innovative approaches.
        </p>
        
        <h3>My Values</h3>
        <ul class="values-list">
          <li>
            <strong>Technical Excellence:</strong> I'm committed to writing clean, maintainable code and implementing best practices 
            that ensure long-term project success and scalability.
          </li>
          <li>
            <strong>User-Centered Design:</strong> I believe that the best applications are those that prioritize the user experience, 
            making complex tasks feel intuitive and simple.
          </li>
          <li>
            <strong>Continuous Improvement:</strong> I constantly seek to enhance both my technical skills and development processes, 
            staying current with emerging technologies and methodologies.
          </li>
          <li>
            <strong>Collaborative Leadership:</strong> I value open communication, constructive feedback, and knowledge sharing, 
            fostering environments where teams can thrive and deliver exceptional results.
          </li>
        </ul>
        
        <h3>Outside of Coding</h3>
        <p>
          When I'm not coding, you might find me exploring the mountains around Calgary, contributing to open-source projects, 
          or diving into the latest research in VR and data visualization. I believe that diverse interests and experiences 
          contribute to creative problem-solving in software development.
        </p>
        
        <div class="cta-buttons">
          <a href="/resume.pdf" download class="btn btn-primary">Download Resume</a>
          <router-link to="/contact" class="btn btn-secondary">Get In Touch</router-link>
        </div>
      </div>
    </div>
    
    <div class="education-experience">
      <div class="education">
        <h2 class="subsection-title">Education</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3>Bachelor of Science in Computer Science</h3>
              <p class="institution">University of Calgary</p>
              <p class="period">2015 - 2019</p>
              <p>
                Relevant coursework included Data Structures & Algorithms, Operating Systems, 
                Distributed Systems, and Software Engineering. Participated in research projects 
                focused on VR applications for medical and geophysical data visualization.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="publications">
        <h2 class="subsection-title">Publications</h2>
        <div class="pub-grid">
          <div class="pub-item">
            <div class="pub-icon">
              <span>📄</span>
            </div>
            <div class="pub-details">
              <h3>EPES: Seizure Propagation Analysis in an Immersive Environment</h3>
              <p class="publisher">ACM Digital Library</p>
              <p class="pub-date">2019</p>
              <a href="https://dl.acm.org/doi/10.1145/3343055.3360745" target="_blank" class="pub-link">View Publication</a>
            </div>
          </div>
          
          <div class="pub-item">
            <div class="pub-icon">
              <span>📄</span>
            </div>
            <div class="pub-details">
              <h3>SIERA: The Seismic Information Extended Reality Analytics Tool</h3>
              <p class="publisher">ACM Digital Library</p>
              <p class="pub-date">2020</p>
              <a href="https://dl.acm.org/doi/10.1145/3380867.3426223" target="_blank" class="pub-link">View Publication</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
